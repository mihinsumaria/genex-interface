from __future__ import division

import base64
import logging
import os
from io import BytesIO

import matplotlib
matplotlib.use('Agg')

import matplotlib.cm
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib.collections import PatchCollection
from matplotlib.patches import Rectangle

import pygal
import pygenex
import squarify


logger = logging.getLogger(__name__)

MAX_RECT = 500
COUNT_PCT = 0.25

HEATMAP_WIDTH = 5
HEATMAP_HEIGHT = 2
LINEPLOT_WIDTH = 5
LINEPLOT_HEIGHT = 1
DPI = 100


def _get_base64_encoding(fig):
    io = BytesIO()
    fig.savefig(io, format='png', dpi=DPI, bbox_inches='tight')
    return 'data:image/png;base64, ' + base64.b64encode(io.getvalue())


def _read_groups_size(path):
    groups = []
    num_ts = length = 0
    if os.path.exists(path):
        with open(path, 'r') as f:
            _, _, num_ts, length = f.readline().strip().split(' ')
            from_length, to_length = map(int, f.readline().strip().split(' '))
            f.readline() # Ignore distance info
            for l in range(from_length, to_length):
                _ = int(f.readline()) # Number of groups of this length
                group_sizes = map(int, f.readline().strip().split(' '))
                for s in group_sizes:
                    groups.append({'length': l, 'size': s})
    subseq = int(num_ts) * int(length) * (int(length) - 1) / 2
    return pd.DataFrame(groups), subseq


def _plot_groups_density(ax, groups_df, count_limit,
                         width=5, height=10, padded=False):
    if groups_df.empty:
        return None
    # these values define the coordinate system for the returned rectangles
    # the values will range from x to x + width and y to y + height
    x = 0.
    y = 0.

    groups_df = groups_df.sort_values('size', ascending=False)
    values = groups_df['size'].values
    cumsum_val = np.cumsum(values)
    cutoff = min(max(np.argmax(cumsum_val >= count_limit), 1), MAX_RECT)
    values = values[:cutoff]
    colors = groups_df['length'].values
    colors = colors[:cutoff]

    # the sum of the values must equal the total area to be laid out
    # i.e., sum(values) == width * height
    values = squarify.normalize_sizes(values, width, height)

    if padded:
        rects = squarify.padded_squarify(values, x, y, width, height)
    else:
        rects = squarify.squarify(values, x, y, width, height)

    ax.set_xlim(0, width)
    ax.set_ylim(0, height)

    def to_patch(rect):
        return Rectangle((rect['x'], rect['y']), rect['dx'], rect['dy'])

    patches = map(to_patch, rects)
    collection = PatchCollection(patches, cmap=matplotlib.cm.plasma, alpha=0.9)
    collection.set_array(colors)
    ax.add_collection(collection)
    ax.set_yticklabels([])
    ax.set_xticklabels([])
    return collection


def get_group_density_base64(group_file_path):    
    fig = plt.figure(figsize=(HEATMAP_WIDTH, HEATMAP_HEIGHT),
                     dpi=DPI)
    ax = fig.add_subplot(1, 1, 1)
    groups_df, subseq = _read_groups_size(group_file_path)
    col = _plot_groups_density(ax, groups_df, COUNT_PCT*subseq,
                               width=HEATMAP_WIDTH,
                               height=HEATMAP_HEIGHT)

    # Plot the colorbar
    if col is not None:
        fig.colorbar(col, ax=ax)

    plt.tight_layout()
    base64encoded = _get_base64_encoding(fig)
    plt.close('all')
    return base64encoded


def get_line_thumbnail_base64(data):
    config = pygal.Config()
    config.height = 170
    config.width = 1020
    config.show_legend = False
    config.include_x_axis = False
    config.show_y_labels = False
    config.show_y_guides = False
    chart = pygal.Line(config)
    chart.add('', data, dots_size=4,
              stroke_style={'width': 4})
    return chart.render_data_uri()
