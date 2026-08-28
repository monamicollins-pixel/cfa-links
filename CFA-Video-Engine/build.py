from engine.renderer import render_slide
from pathlib import Path

lesson = "culture_francophone"

slides = sorted(Path(f"lessons/{lesson}/slides").glob("*.png"))

for slide in slides:
    number = slide.stem

    audio = Path(f"lessons/{lesson}/audio/{number}.wav")

    output = Path(f"output/{lesson}_{number}.mp4")

    if audio.exists():
        print(f"Rendering {number}...")
        render_slide(
            str(slide),
            str(audio),
            str(output)
        )

print("Finished.")
