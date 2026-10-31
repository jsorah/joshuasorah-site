# Start the local preview, including drafts.
default: serve

serve:
    hugo server -D

# Resize and compress a photo for publishing.
[no-cd]
image source destination:
    magick {{quote(source)}} -auto-orient -resize '1600x1600>' -colorspace sRGB -strip -quality 82 {{quote(destination)}}
