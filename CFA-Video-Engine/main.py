from engine.renderer import render_slide

render_slide(
    "lessons/culture_francophone/slides/01.png",
    "lessons/culture_francophone/audio/01.wav",
    "output/culture_01.mp4"
)

render_slide(
    "lessons/culture_francophone/slides/02.png",
    "lessons/culture_francophone/audio/02.wav",
    "output/culture_02.mp4"
)

print("Done!")
