from moviepy.editor import TextClip, VideoClip

def typing_clip(text, duration, fontsize=52, color="white"):

    words = text.split()

    if len(words) == 0:
        words = [""]

    seconds_per_word = duration / len(words)

    def make_frame(t):

        visible = min(len(words), int(t / seconds_per_word) + 1)

        current = " ".join(words[:visible])

        clip = TextClip(
            current + " |",
            fontsize=fontsize,
            color=color,
            method="caption",
            size=(1600,220)
        ).set_duration(0.1)

        return clip.get_frame(0)

    return VideoClip(make_frame, duration=duration)
