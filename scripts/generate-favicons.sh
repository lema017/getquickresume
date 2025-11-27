#!/bin/bash

# Script to generate favicon files from SVG
# Requires ImageMagick to be installed: brew install imagemagick (on macOS)

echo "Generating favicon files from SVG..."

# Create 16x16 PNG
convert public/favicon.svg -resize 16x16 public/favicon-16x16.png

# Create 32x32 PNG  
convert public/favicon.svg -resize 32x32 public/favicon-32x32.png

# Create 180x180 Apple touch icon
convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png

# Create ICO file (16x16 and 32x32 combined)
convert public/favicon-16x16.png public/favicon-32x32.png public/favicon.ico

echo "Favicon files generated successfully!"
echo "Files created:"
echo "- public/favicon.svg (already exists)"
echo "- public/favicon-16x16.png"
echo "- public/favicon-32x32.png" 
echo "- public/apple-touch-icon.png"
echo "- public/favicon.ico"