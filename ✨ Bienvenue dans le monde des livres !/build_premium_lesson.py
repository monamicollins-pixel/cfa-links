from moviepy.editor import VideoClip, AudioFileClip
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import math
import os

WIDTH = 1920
HEIGHT = 1080
FPS = 30

TEXT_FILE = "02-vocabulaire.txt"
AUDIO_FILE = "02-vocabulaire.wav"
OUTPUT_FILE = "output/02-vocabulaire.mp4"

os.makedirs("output", exist_ok=True)

audio = AudioFileClip(AUDIO_FILE)

with open(TEXT_FILE, encoding="utf-8") as f:
    text = f.read()

font_title = ImageFont.truetype(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    74
)

font_body = ImageFont.truetype(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    54
)

title = "Chapitre 2"
subtitle = "Le vocabulaire"

typing_speed = len(text) / audio.duration
def make_frame(t):
    img = Image.new("RGB", (WIDTH, HEIGHT), (8, 15, 35))
    draw = ImageDraw.Draw(img)

    # Animated blue gradient
    for y in range(HEIGHT):
        r = 8
        g = int(20 + y / 20)
        b = int(50 + y / 8)
        draw.line((0, y, WIDTH, y), fill=(r, g, min(255, b)))

    # Moving glowing circles
    for i in range(8):
        x = WIDTH/2 + math.sin(t*0.4 + i) * 700
        y = HEIGHT/2 + math.cos(t*0.6 + i*1.7) * 300
        radius = 90

        draw.ellipse(
            (
                x-radius,
                y-radius,
                x+radius,
                y+radius
            ),
            fill=(20,120,255,25)
        )

    # Decorative top bar
    draw.rectangle((0,0,WIDTH,110), fill=(10,18,45))

    # Gold title
    draw.text(
        (90,30),
        title,
        font=font_title,
        fill=(255,210,40)
    )

    # Blue subtitle
    draw.text(
        (90,120),
        subtitle,
        font=font_body,
        fill=(80,180,255)
    )

    # Typing effect
    letters = int(t * typing_speed)
    visible = text[:letters]

    draw.multiline_text(
        (90,240),
        visible,
        font=font_body,
        fill=(245,245,245),
        spacing=12
    )

    # Cursor
    if letters < len(text):
        bbox = draw.multiline_textbbox(
            (90,240),
            visible + "|",
            font=font_body,
            spacing=12
        )

        draw.text(
            (bbox[2], bbox[3]-55),
            "|",
            font=font_body,
            fill=(255,255,255)
        )

    return np.array(img)
video = VideoClip(make_frame, duration=audio.duration)

video = video.set_audio(audio)

video.write_videofile(
    OUTPUT_FILE,
    fps=FPS,
    codec="libx264",
    audio_codec="aac"
)
