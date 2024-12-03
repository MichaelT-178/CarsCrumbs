import os
from PIL import Image

directory = 'menu'

def resize_image(image, max_width, max_height):
    width, height = image.size

    if width > max_width or height > max_height:
        scaling_factor = min(max_width / width, max_height / height)
        new_width = int(width * scaling_factor)
        new_height = int(height * scaling_factor)
        return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    return image


for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        with Image.open(os.path.join(directory, filename)) as img:
            resized_img = resize_image(img, 1000, 1000)
            resized_img.save(os.path.join(directory, filename))
            print(f"Resized and saved: {filename}")

print("All images resized and saved successfully.")

# import json


# with open("test_menu/MenuItems.json", 'r') as file:
#     data = json.load(file)



# print(max(data.keys(), key=len))
# print(len('Brown_Butter_Chocolate_Chip'))
    

# Gingerbread_Latte_Cookies
# 25

# Brown_Butter_Chocolate_Chip
# 27