import moviepy.editor
import moviepy.video.fx.all as vfx
import os
import random
import fnmatch

for i in range(1, 600):
    # import to moviepy
    clip = moviepy.editor.VideoFileClip("rec.mov")
    start = random.random() * clip.duration
    end = start + 0.5

    sub_clip = clip.subclip(start, end).set_fps(25)
    sub_clip.write_gif('cuts/' + str(i) + '.gif')
