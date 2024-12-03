import os
from PIL import Image, ImageOps

directory = 'real_menu/pics'

def resize_image(image, max_width, max_height):
    width, height = image.size

    if width > max_width or height > max_height:
        scaling_factor = min(max_width / width, max_height / height)
        new_width = int(width * scaling_factor)
        new_height = int(height * scaling_factor)
        return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    return image


for root, _, files in os.walk(directory):
    for filename in files:
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            file_path = os.path.join(root, filename)
            try:
                with Image.open(file_path) as img:
                    img = ImageOps.exif_transpose(img)

                    resized_img = resize_image(img, 1000, 1000)
                    
                    resized_img.save(file_path)
                    print(f"Resized and saved: {file_path}")
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print("All images resized and saved successfully.")