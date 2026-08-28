#!/bin/bash

VOICE="$HOME/piper/voices/fr_FR-upmc-medium.onnx"
PIPER="$HOME/piper/piper"

for f in *.txt
do
    out="${f%.txt}.wav"

    echo "Generating $out..."

    cat "$f" | "$PIPER" \
        --model "$VOICE" \
        --output_file "$out"
done

echo "Done!"
