import os
import random
import numpy as np
from pysc2.lib import actions


# Convert the SC2Env timestep into a Gym-style tuple
def unpack_timestep(timestep):
    feature_map = timestep.observation.feature_minimap
    feature_screen = timestep.observation.feature_screen
    rgb_map = timestep.observation.rgb_minimap
    rgb_screen = timestep.observation.rgb_screen

    state = (feature_map, feature_screen, rgb_map, rgb_screen)
    reward = timestep.reward
    done = timestep.last()
    info = {}
    return state, reward, done, info


# A hack to get around some very odd code in pysc2.maps.lib
# This isn't necessary if you're using any of the maps that
# are hard-coded into pysc2
# TODO: This function just registers a map that already exists
# in Maps/, but it could also copy a map into Maps/
def register_map(map_dir, map_name):
    from pysc2.maps import lib
    if map_name in globals():
        print('Map {}.SC2Map already exists, skipping registration'.format(map_name))
        return
    map_filename = map_name + '.SC2Map'
    # TODO: find ~/StarCraftII based on os.environ if applicable
    maps_install_dir = os.path.expanduser('~/StarCraftII/Maps')
    print('Copying map {} to maps directory {}'.format(map_filename, maps_install_dir))
    shutil.copy(map_filename, maps_install_dir)
    class_definition = dict(prefix=map_dir, filename=map_filename, players=1)
    # Don't do this at home
    constructed_class = type(map_name, (lib.Map,), class_definition)
    globals()[map_name] = constructed_class


# Just a hack to prevent errors generated by absl
def quiet_absl():
    import sys
    import absl
    absl.flags.FLAGS(sys.argv)
