import numpy as np
import pysc2
from pysc2.agents import base_agent
from pysc2.env import sc2_env
from pysc2.lib import actions, features, units
from pysc2 import maps, lib
from s2clientprotocol import sc2api_pb2 as sc_pb
from sc2env.pysc2_util import register_map
from sc2env.utility import getOneHotState
from copy import copy, deepcopy
import os
import sys

SCREEN_SIZE  = 40
MAP_NAME = 'TugOfWar-Self-Play'
UNIT_TYPES = {
    'SCV': 45,
    'Marine': 48,
    'Viking': 9,
    'Colossus': 83
}
action_to_ability_id = {
    0: 146, # Effect Marine
    1: 148, # Effect VikingFighter
    2: 150, # Effect Colossus
    3: 152, # Effect Pylon
    'switch_player': 154, # Effect Pylon
}

unit_types_player1 = {
    21 : 0, #'Barracks'
    28 : 1, # 'Starport'
    70 : 2, # 'RoboticsFacility'
    60 : 3, # 'Pylon'
    59 : 4, # 'Nexus'
    48 : 11, # 'Marine'
    35 : 12, # 'Viking'
    4 : 13 # 'Colossus'
}
unit_types_player2 = {
    21 : 5, #'Barracks'
    28 : 6, # 'Starport'
    70 : 7, # 'RoboticsFacility'
    60 : 8, # 'Pylon'
    59 : 9, # 'Nexus'
    48 : 14, # 'Marine'
    35 : 15, # 'Viking'
    4 : 16 # 'Colossus'
}
maker_cost = {
    'Marine' : 50,
    'Viking' : 75,
    'Colossus' : 100,
    'Pylon' : 75
}
class TugOfWar():
    def __init__(self, reward_types, map_name = None, unit_type = [], generate_xai_replay = False, xai_replay_dimension = 256, verbose = False):
        if map_name is None:
            map_name = MAP_NAME
        maps_dir = os.path.join(os.path.dirname(__file__), '..', 'maps')
        print("map director: " + str(maps_dir))
        register_map(maps_dir, map_name)
        
        if generate_xai_replay:
            aif=features.AgentInterfaceFormat(
                feature_dimensions=features.Dimensions(screen=SCREEN_SIZE, minimap=SCREEN_SIZE),
                rgb_dimensions=sc2_env.Dimensions(
                screen=(xai_replay_dimension, xai_replay_dimension),
                minimap=(64, 64),
                ),
                action_space=actions.ActionSpace.FEATURES,
                camera_width_world_units = 28,
                #use_camera_position = True,
            )
            step_mul_value = 4
        else:
            aif=features.AgentInterfaceFormat(
              feature_dimensions = features.Dimensions(screen = SCREEN_SIZE, minimap = SCREEN_SIZE),
              action_space = actions.ActionSpace.FEATURES,
              camera_width_world_units = 100,
              
              )
        np.set_printoptions(threshold=sys.maxsize,linewidth=sys.maxsize, precision = 1)
        step_mul_value = 16
        self.sc2_env = sc2_env.SC2Env(
          map_name = map_name,
          agent_interface_format = aif,

          step_mul = step_mul_value,
          game_steps_per_episode = 0,
          score_index = 0,
          visualize = True,)

        
        self.current_obs = None
        self.actions_taken = 0
        self.decomposed_rewards = []
        self.verbose = verbose
        self.decision_point = 1
        self.miner_index = 10
        self.reset_steps = -1
        self.fifo_player_1 = []
        self.fifo_player_2 = []
        self.building_limiation = 30
        self.mineral_limiation = 1500
        self.norm_vector = np.array([1, 1, 1, 1, 100, 1, 1, 1, 1, 100, 100, 1, 1, 1, 1, 1, 1])

        self.signal_of_end = False
        self.end_state = None
        self.maker_cost_np = np.zeros(len(maker_cost))
        for i, mc in enumerate(maker_cost.values()):
            self.maker_cost_np[i] = mc

        self.reward_types = reward_types
        self.last_decomposed_reward_dict = {}
        self.decomposed_reward_dict = {}
        
        for rt in reward_types:
        	self.decomposed_reward_dict[rt] = 0
        	self.last_decomposed_reward_dict[rt] = 0

        unit_type = [UNIT_TYPES['Marine'], UNIT_TYPES['Viking'], UNIT_TYPES['Colossus']]
        self.input_screen_features = {
            "PLAYER_RELATIVE":[1, 4],
            "UNIT_TYPE": unit_type,
            'HIT_POINT': 0,
            'HIT_POINT_RATIO': 0,
            'SHIELD': 0,
            'SHIELD_RATIO': 0,
            'UNIT_DENSITY': 0
        }
        
    def reset(self):
        # Move the camera in any direction
        # This runs the ResetEpisode trigger built into the map
        self.decomposed_rewards = []
        action = actions.FUNCTIONS.move_camera([0, 0])
        self.actions_taken = 0
        self.current_obs = self.sc2_env.step([action])[0]
        
        if self.reset_steps >= 10:
            self.sc2_env.reset()
            self.reset_steps = 0
        self.reset_steps += 1
        
        self.end_state = None
        self.decision_point = 1
        self.fifo_player_1 = []
        self.fifo_player_2 = []
        
        data = self.sc2_env._controllers[0]._client.send(observation = sc_pb.RequestObservation())
        actions_space = self.sc2_env._controllers[0]._client.send(action = sc_pb.RequestAction())

        data = data.observation.raw_data.units
        self.getRewards(data)
#         # Get channel states
#         state = self.get_channel_state(self.current_obs)
        # Get custom states
        state_1 = self.get_custom_state(data, 1)
        state_2 = self.get_custom_state(data, 2)
        
        for rt in self.reward_types:
            self.decomposed_reward_dict[rt] = 0
            self.last_decomposed_reward_dict[rt] = 0
#         self.use_custom_ability(action_to_ability_id['switch_player'])
        return state_1, state_2

    def step(self, action, player):
        done = False
        dp = False
        data = self.sc2_env._controllers[0]._client.send(observation=sc_pb.RequestObservation())
        data = data.observation.raw_data.units
        
        if len(action) > 0:
            if player == 1:
                fifo = self.fifo_player_1
            else:
                fifo = self.fifo_player_2
            ## ACTION TAKING ###
            current_player = self.get_current_player(data)
#             print(current_player)
            if current_player != player:
#                 print('switch')
                self.use_custom_ability(action_to_ability_id['switch_player'])
                
            for a_index, num_action in enumerate(action):
                for _ in range(num_action):
#                     print(a_index, num_action)
                    self.use_custom_ability(action_to_ability_id[a_index])
                    fifo.append(a_index)
                    if len(fifo) > self.building_limiation:
                        del fifo[0]
                    
                    
            action = actions.FUNCTIONS.no_op()
            self.current_obs = self.sc2_env.step([action])[0]
                    
        else:
            action = actions.FUNCTIONS.no_op()
            self.current_obs = self.sc2_env.step([action])[0]
            # Get reward from data
            done, dp = self.getRewards(data)

            if dp or done:
              # Get channel states
              # state = self.get_channel_state(self.current_obs)
              # Get custom states
                state_1 = self.get_custom_state(data, 1)
                state_2 = self.get_custom_state(data, 2)
                if done:
                    self.end_state_1 = state_1
                    self.end_state_2 = state_2
                    
                self.decomposed_rewards = []
                for rt in self.reward_types:
                    value_reward = self.decomposed_reward_dict[rt] - self.last_decomposed_reward_dict[rt]
                    self.decomposed_rewards.append(value_reward)
                # TODO: consider to merge two for
                for rt in self.reward_types:
                    self.last_decomposed_reward_dict[rt] = self.decomposed_reward_dict[rt]

                return state_1, state_2, done, dp
        return None, None, done, dp

    def register_map(self, map_dir, map_name):
        map_filename = map_name + '.SC2Map'
        class_definition = dict(prefix = map_dir, filename = map_filename, players = 1)
        constructed_class = type(map_name, (pysc2.maps.lib.Map,), class_definition)
        globals()[map_name] = constructed_class


    def use_custom_ability(self, ability_id, player_id=1):
        # Sends a command directly to the SC2 protobuf API
        # Can cause the pysc2 client to desync, unless step_sc2env() is called afterward
        from s2clientprotocol import sc2api_pb2
        from s2clientprotocol import common_pb2
        from s2clientprotocol import spatial_pb2

        def get_action_spatial(ability_id):
            target_point = common_pb2.PointI()
            target_point.x = 0
            target_point.y = 0

            action_spatial_unit_command = spatial_pb2.ActionSpatialUnitCommand(target_minimap_coord=target_point)
            action_spatial_unit_command.ability_id = ability_id

            action_spatial = spatial_pb2.ActionSpatial(unit_command=action_spatial_unit_command)
            action = sc2api_pb2.Action(action_feature_layer=action_spatial)
            return action
        
        player_action = get_action_spatial(ability_id)
        request_action = sc2api_pb2.RequestAction(actions=[player_action])
        request = sc2api_pb2.Request(action=request_action)

        # Bypass pysc2 and send the proto directly
        client = self.sc2_env._controllers[player_id - 1]._client
        if self.verbose:
            print('Calling client.send_req for player_id {}'.format(player_id))
        if self.sc2_env._state == 2:
            print('Game is over, cannot send action')
            return
        client.send_req(request)

    def get_channel_state(self, observation):
        
        state = observation[3]['feature_screen']
        state = getOneHotState(state, self.input_screen_features)
        state = np.reshape(state, (1, -1))
        
        return state
    def get_custom_state(self, data, player):
        """
        State of Player 1:
            Plyer1 : Number of Marines Maker 0
            Plyer1 : Number of Vikings Maker 1
            Plyer1 : Number of Colossus Maker 2
            Plyer1 : Number of Pylon 3
            Plyer1 : Nexus HP 4
            
            Plyer2 : Number of Marines Maker 5
            Plyer2 : Number of Vikings Maker 6
            Plyer2 : Number of Colossus Maker 7
            Plyer2 : Number of Pylon 8
            Plyer2 : Nexus HP 9
            
            Unspent Miner # get_illegal_actions should change if it change 10
            
            Player1: Marine on the field 11
            Player1: Vikings on the field 12
            Player1: Colossus on the field 13
            Player2: Marine on the field 14
            Player2: Vikings on the field 15
            Player2: Colossus on the field 16
        State of player 2:
            Plyer2 : Number of Marines Maker 0
            Plyer2 : Number of Vikings Maker 1
            Plyer2 : Number of Colossus Maker 2
            Plyer2 : Number of Pylon 3
            Plyer2 : Nexus HP 4
            
            Plyer1 : Number of Marines Maker 5
            Plyer1 : Number of Vikings Maker 6
            Plyer1 : Number of Colossus Maker 7
            Plyer1 : Number of Pylon 8
            Plyer1 : Nexus HP 9
            
            Unspent Miner # get_illegal_actions should change if it change 10
            
            Player2: Marine on the field 11
            Player2: Vikings on the field 12
            Player2: Colossus on the field 13
            Player1: Marine on the field 14
            Player1: Vikings on the field 15
            Player1: Colossus on the field 16
            
        """
        if player == 1:
            utp_1 = unit_types_player1
            utp_2 = unit_types_player2
        else:
            utp_1 = unit_types_player2
            utp_2 = unit_types_player1
            
        state = np.zeros(17)
        for x in data:
            index_enemy = 0
            if x.unit_type in unit_types_player1:
                if x.alliance == 1: # 1: Self, 4: Enemy
                    unit_types = utp_1
                else:
                    unit_types = utp_2
                    
                if x.unit_type != 59: # Non Nexus
                    state[unit_types[x.unit_type]] += 1
                else:
                    state[unit_types[x.unit_type]] = x.health
            
            if player == 1:
                mineral_scv_index = 3
            else:
                mineral_scv_index = 103
                
            if x.unit_type == UNIT_TYPES['SCV'] and x.shield == mineral_scv_index:
                # get_illegal_actions should change if it change
                state[self.miner_index] = x.health - 1
                
        if state[self.miner_index] > self.mineral_limiation:
            state[self.miner_index] = self.mineral_limiation
        state = self.normalization(state)
        
        return state
    
    def get_current_player(self, data):
        for x in data:
            if x.unit_type == UNIT_TYPES['SCV'] and x.shield == 45:
                return x.health
    
    def normalization(self, state):
        return state / self.norm_vector
    
    def denormalization(self, state):
        return state * self.norm_vector
    
    def getRewards(self, data):
        """
            1:   Damage to player 1
            101: Damage to player 2
            2:   Player 1 wins
            102: Player 2 wins
        """
        end = False
#         l = len(self.reward_types)
        dp = False
        for x in data:
            if x.unit_type == UNIT_TYPES['SCV']:
                if x.shield == 1:
                    self.decomposed_reward_dict['player_1_get_damage_2'] = x.health - 1
                if x.shield == 101:
                    self.decomposed_reward_dict['player_2_get_damage_1'] = x.health - 1
                if x.shield == 2:
                    self.decomposed_reward_dict['player_1_win_1'] = x.health - 1
                if x.shield == 102:
                    self.decomposed_reward_dict['player_2_win_2'] = x.health - 1
                    
                if x.shield == 41 and x.health == 2:
                    end = True
                if x.shield == 44 and x.health != self.decision_point:
                    self.decision_point = x.health
                    dp = True

        return end, dp

    def sperate_reward(self, reward):
        reward = deepcopy(reward)
        reward_1 = []
        reward_2 = []
        
        for i, rt in enumerate(self.reward_types):
            if rt[-1] == '1':
                reward_1.append(reward[i])
                reward_2.append(reward[i] * -1)
            else:
                reward_1.append(reward[i] * -1)
                reward_2.append(reward[i])
        return reward_1, reward_2
        
    def get_illegal_actions(self, state):
        """
        0: "Effect Marine", 50 cost
        1: "Effect VikingFighter", 75 cost
        2: "Effect Colossus", 75 cost
        3: "Effect Pylon", 200 cost
        4: "no_op",
        """
#         print(state)
        illegal_actions = []
        if state[self.miner_index] < 200:
            illegal_actions.append(2)
        if state[self.miner_index] < 75:
            illegal_actions.append(1)
            illegal_actions.append(3)
        if state[self.miner_index] < 50:
            illegal_actions.append(0)
#         print(illegal_actions)
        return illegal_actions

    def get_big_A(self, miner, 
                  all_A_vectors = None, vector = None, index = 0):
        if all_A_vectors is None:
            all_A_vectors = set()
        if vector is None:
            vector = (0,0,0,0)
        if miner < 50:
            all_A_vectors.add(vector)
            return list(all_A_vectors)
        next_vector = copy(vector)
        self.get_big_A(miner - miner, all_A_vectors, next_vector)
        if miner >= maker_cost['Marine']:
            if index <= 0:
                next_vector = (vector[0] + 1, vector[1],
                                  vector[2], vector[3])
                self.get_big_A(miner - maker_cost['Marine'], all_A_vectors, next_vector, 0)
            if miner >= maker_cost['Viking']:
                if index <= 1:
                    next_vector = (vector[0], vector[1] + 1,
                                  vector[2], vector[3])
                    self.get_big_A(miner - maker_cost['Viking'], all_A_vectors, next_vector, 1)
                if miner >= maker_cost['Pylon']:
                    if index <= 2:
                        next_vector = (vector[0], vector[1],
                                  vector[2], vector[3] + 1)
                        self.get_big_A(miner - maker_cost['Pylon'], all_A_vectors, next_vector, 2)
                    if miner >= maker_cost['Colossus']:
                        if index <= 3:
                            next_vector = (vector[0], vector[1],
                                  vector[2] + 1, vector[3])
                            self.get_big_A(miner - maker_cost['Colossus'], all_A_vectors, next_vector, 3)

        return list(all_A_vectors)
    
    def combine_sa(self, s, actions, player):
        s = np.repeat(s.reshape((1,-1)), len(actions), axis = 0)
        actions = np.array(actions)
        s[:,:4] += actions
        if player == 1:
            fifo = deepcopy(self.fifo_player_1)
        else:
            fifo = deepcopy(self.fifo_player_2)
            
        for a in fifo:
            s[s[:, :4].sum(axis = 1) > self.building_limiation, a] -= 1
#             temp_s = s[s[:, :4].sum(axis = 1) > self.building_limiation]
#             if len(temp_s) > 0:
#                 print(temp_s)
#             temp_s[:, a] -= 1
            
        s[:, self.miner_index] -= np.sum(self.maker_cost_np * actions, axis = 1) / 100
        return s
    
#         s = np.repeat(s.reshape((1,-1)), len(actions), axis = 0)
#         actions = np.array(actions)
#         return np.hstack((s, actions))

