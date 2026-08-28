visible = int(chars * t / duration)
shown = text[:visible]

lines = shown.split("\n")

MAX_LINES = 14

if len(lines) > MAX_LINES:
    lines = lines[-MAX_LINES:]

y = 220

for line in lines:

    line = line.strip()

    if not line:
        y += 25
        continue

    color = (255,255,255)
    font = font_text

    if line.startswith("Chapitre"):
        color = (255,215,0)
        font = font_title

    elif line.startswith("📖") or line.startswith("🔹"):
        color = (100,180,255)

    elif len(line.split()) <= 4:
        color = (0,255,140)

    draw.text(
        (120,y),
        line,
        font=font,
        fill=color
    )

    y += 55

font_text = ImageFont.truetype(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    46
)

chars = len(text)

logo = Image.open(LOGO).convert("RGBA")
logo.thumbnail((180,180))

def background(t):

    img = Image.new("RGB",(WIDTH,HEIGHT))

    draw = ImageDraw.Draw(img)

    # animated gradient

    for y in range(HEIGHT):

        r = 10

        g = int(20+20*math.sin(t+y/300))

        b = int(55+40*y/HEIGHT)

        draw.line((0,y,WIDTH,y),fill=(r,g,b))

    img.paste(logo,(50,40),logo)

    draw.text(
        (260,70),
        "COLLINS FRENCH ACADEMY",
        font=font_title,
        fill=(255,215,0)
    )

    visible = int(chars*t/duration)

    shown = text[:visible]

    draw.multiline_text(
        (120,250),
        shown,
        font=font_text,
        fill="white",
        spacing=15
    )

    return np.array(img)

video = VideoClip(background,duration=duration)

video = video.set_audio(audio)

os.makedirs("output",exist_ok=True)

video.write_videofile(
    OUTPUT_FILE,
    fps=FPS,
    codec="libx264",
    audio_codec="aac"
)
