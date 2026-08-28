
from pathlib import Path

p=Path("engine/renderer.py")
txt=p.read_text()

old='''
    from pathlib import Path

    image_folder = Path(image).parent.parent / "images"
    images = sorted(image_folder.glob("*.jpg"))

    clips = []
    duration = narration.duration / max(len(images),1)

    for i, img in enumerate(images):
        c = (
            ImageClip(str(img))
            .set_duration(duration)
            .resize(height=900)
            .set_position(("center","center"))
            .set_start(i*duration)
            .crossfadein(0.7)
        )
        c = zoom(c)
        c = fade(c)
        clips.append(c)
'''

new='''
    from pathlib import Path

    image_folder = Path(image).parent.parent / "images"
    images = sorted(image_folder.glob("*.jpg"))

    clips = []
    duration = narration.duration / max(len(images),1)

    for i, img in enumerate(images):
        c = (
            ImageClip(str(img))
            .set_duration(duration)
            .resize(height=900)
            .set_position(("center","center"))
            .set_start(i*duration)
            .crossfadein(0.7)
        )
        c = zoom(c)
        c = fade(c)
        clips.append(c)
'''

txt=txt.replace(old,new)

txt=txt.replace(
'''video = CompositeVideoClip(
        [bg] + clips + [typing, progress_bar(narration.duration)]
    )''',
'''video = CompositeVideoClip(
        [bg] + clips + [typing, progress_bar(narration.duration)]
    )'''
)

p.write_text(txt)
print("renderer.py updated successfully.")
