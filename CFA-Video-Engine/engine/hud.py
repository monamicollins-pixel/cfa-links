from moviepy.editor import *
from PIL import Image, ImageDraw

WIDTH = 1920
HEIGHT = 1080

def progress_bar(duration):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0,0,0,0))
    draw = ImageDraw.Draw(img)

    draw.rectangle(
        (120,1000,1800,1012),
        fill=(40,40,40,180)
    )

    img.save("output/progress.png")

    return (
        ImageClip("output/progress.png")
        .set_duration(duration)
    )
