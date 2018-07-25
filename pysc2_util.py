import sys
import os
import random
import numpy as np
import shutil
from pysc2.maps import lib
from pysc2.lib import actions

import imutil


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
def register_map(map_dir, map_name):
    quiet_absl()

    print('Installing Map {}'.format(map_name))
    if map_name in globals():
        print('Map {}.SC2Map already exists, skipping registration'.format(map_name))
        return

    sc2_path = os.environ.get('SC2PATH', '~/StarCraftII')
    print('Looking for Maps directory in {}'.format(sc2_path))
    maps_install_dir = os.path.expanduser(os.path.join(sc2_path, 'Maps'))
    if map_name.endswith('.SC2Map'):
        map_name = map_name.replace('.SC2Map', '')
    map_filename = map_name + '.SC2Map'

    print('Copying map {} to maps directory {}'.format(map_filename, maps_install_dir))
    shutil.copy(map_filename, maps_install_dir)

    # Don't do this at home
    class_definition = dict(prefix=map_dir, filename=map_filename, players=1)
    constructed_class = type(map_name, (lib.Map,), class_definition)
    globals()[map_name] = constructed_class
    print('Installed map {}'.format(map_name))


# Just a hack to prevent errors generated by absl
# Needs to run before SC2Env() is called
def quiet_absl():
    import absl
    absl.flags.FLAGS(sys.argv)


# Input: 17-layer SC2Env Feature map
def save_sc2_feature_map_to_png(feature_map, output_filename):
    imutil.show(feature_map, filename=output_filename, normalize_color=False, resize_to=None)


# Input: png filename
def load_png_to_sc2_feature_map(input_filename, width=256):
    grid = imutil.decode_jpg(input_filename, resize_to=None)
    grid = grid.astype(np.uint8)
    height = width
    assert grid.shape == (height * 5, width * 4, 3)
    return untile(grid, height, width)[:17]


def untile(grid, item_height, item_width):
    items = []
    total_height, total_width = grid.shape[:2]
    for y in range(0, total_height, item_height):
        for x in range(0, total_width, item_width):
            item = grid[y:y+item_height, x:x+item_width]
            # TODO: Handle RGB
            if len(item.shape) > 2:
                item = item.mean(axis=-1)
            items.append(item)
    return np.array(items)
