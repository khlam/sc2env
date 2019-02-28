import sc2env
import gym
import imutil
import time
from sc2env.environments.zergling_defense import ZerglingDefenseEnvironment


def generate_demo_video():
    env = ZerglingDefenseEnvironment()
    state = env.reset()
    done = False
    print('Playing sample game with environment {}'.format(env))
    filename = 'game-ZerglingDefense-{}.mp4'.format(int(time.time()))
    vid = imutil.Video(filename, framerate=8)

    # This function will run on each *rendered frame* of the game, including
    # frames in-between the agent's actions
    def video_write_frame(state, reward, done, info):
        minimap_ftr, screen_ftr, minimap_rgb, screen_rgb = state
        vid(screen_rgb, normalize=False)

    rewards = []
    for _ in range(100):
        if done:
            break
        action = env.action_space.sample()
        state, reward, done, info = env.step(action, animation_callback=video_write_frame)
        video_write_frame(state, reward, done, info)
        rewards.append(reward)
        print('Timestep t={} took action {} got reward {}'.format(len(rewards), action, reward))
    vid.finish()
    print('Finished episode with {} total reward after {} timesteps'.format(sum(rewards), len(rewards)))


if __name__ == '__main__':
    generate_demo_video()
