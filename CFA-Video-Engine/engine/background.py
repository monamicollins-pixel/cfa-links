from PIL import Image, ImageDraw
import numpy as np
import math
import random

WIDTH = 1920
HEIGHT = 1080

# Create fixed particle positions
random.seed(42)

PARTICLES = []

for _ in range(80):
    PARTICLES.append((
        random.randint(0, WIDTH),
        random.randint(0, HEIGHT),
        random.randint(2, 6)
    ))


def make_background(t):

    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)

    # Animated gradient
    for y in range(HEIGHT):

        r = 8

        g = int(18 + 18 * math.sin(t + y / 180))

        b = int(55 + 90 * y / HEIGHT)

        draw.line((0, y, WIDTH, y), fill=(r, g, b))

    # Soft glow in the top-left
    for r in range(350, 0, -8):

        alpha = int(35 * (1 - r / 350))

        color = (
            40 + alpha,
            80 + alpha,
            160 + alpha
        )

        draw.ellipse(
            (
                70 - r,
                60 - r,
                70 + r,
                60 + r
            ),
            outline=color
        )

    # Floating particles
    for x, y, size in PARTICLES:

        yy = y + 25 * math.sin(t + x / 100)

        draw.ellipse(
            (
                x,
                yy,
                x + size,
                yy + size
            ),
            fill=(255, 255, 255)
        )

    return np.array(img)
