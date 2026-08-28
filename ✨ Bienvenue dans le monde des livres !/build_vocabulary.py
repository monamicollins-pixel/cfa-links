from moviepy.editor import VideoClip, AudioFileClip
from PIL import Image, ImageDraw, ImageFont
import numpy as np

WIDTH = 1920
HEIGHT = 1080
FPS = 30

audio = AudioFileClip("02-vocabulaire.wav")

with open("02-vocabulaire.txt", encoding="utf-8") as f:
    text = f.read()

font = ImageFont.truetype(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    60
)

chars = len(text)

def make_frame(t):
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 18, 40))
    draw = ImageDraw.Draw(img)

    n = min(chars, int(chars * t / audio.duration))
    current = text[:n] + "|"

    draw.multiline_text(
        (120, 120),
        current,
        fill="white",
        font=font,
        spacing=15,
    )

    return np.array(img)

video = VideoClip(make_frame, duration=audio.duration)
video = video.set_audio(audio)

video.write_videofile(
    "02-vocabulaire-typed.mp4",
    fps=FPS,
    codec="libx264",
    audio_codec="aac"
)
