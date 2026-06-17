from PIL import Image
from pathlib import Path

# Folder containing images
INPUT_FOLDER = r"."

# Optional: save converted images elsewhere
OUTPUT_FOLDER = r"./webp"

Path(OUTPUT_FOLDER).mkdir(exist_ok=True)

supported = {".png", ".jpg", ".jpeg", ".bmp", ".tiff"}

for file in Path(INPUT_FOLDER).iterdir():

    if file.suffix.lower() not in supported:
        continue

    try:
        img = Image.open(file)

        # Preserve transparency
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")

        output = Path(OUTPUT_FOLDER) / f"{file.stem}.webp"

        img.save(
            output,
            format="WEBP",
            quality=85,      # 80–90 usually good
            method=6         # best compression
        )

        print(f"Converted: {file.name}")

    except Exception as e:
        print(f"Failed: {file.name} -> {e}")

print("Done.")