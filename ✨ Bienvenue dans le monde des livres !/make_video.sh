#!/bin/bash

ffmpeg -y \
-loop 1 \
-framerate 30 \
-i "✨ Bienvenue dans le monde des livres !-1.png" \
-i "01-introduction.wav" \
-c:v libx264 \
-tune stillimage \
-c:a aac \
-b:a 192k \
-pix_fmt yuv420p \
-shortest \
01-introduction.mp4
