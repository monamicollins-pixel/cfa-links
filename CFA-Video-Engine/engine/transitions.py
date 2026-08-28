from moviepy.editor import *

def fade(video):
    return video.fadein(0.6).fadeout(0.6)

def zoom(clip):
    return clip.resize(lambda t: 1 + 0.04*t)
