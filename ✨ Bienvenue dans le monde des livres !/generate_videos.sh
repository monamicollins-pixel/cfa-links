#!/bin/bash

mkdir -p output

for i in 1 2 3 4 5 6
do
    png="✨ Bienvenue dans le monde des livres !-$i.png"

    case $i in
        1) base="01-introduction" ;;
        2) base="02-vocabulaire" ;;
        3) base="03-lecture" ;;
        4) base="04-dialogue" ;;
        5) base="05-exercice" ;;
        6) base="06-conclusion" ;;
    esac

    if [ -f "$png" ] && [ -f "$base.wav" ]; then
        echo "Creating $base.mp4..."

        ffmpeg -y \
        -loop 1 \
        -framerate 30 \
        -i "$png" \
        -i "$base.wav" \
        -vf "scale=1920:1080,zoompan=z='min(zoom+0.0004,1.10)':d=900:s=1920x1080" \
        -c:v libx264 \
        -c:a aac \
        -b:a 192k \
        -pix_fmt yuv420p \
        -shortest \
        "output/$base.mp4"
    else
        echo "Skipping $base (missing PNG or WAV)"
    fi
done

echo "Finished!"
