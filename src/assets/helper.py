import os
from PIL import Image

# Specify the directory containing the .jpg images
directory = 'menu'
output_directory = 'menu'  # You can use the same directory or a different one

# Create the output directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Function to resize the image
def resize_image(image, max_width, max_height):
    width, height = image.size
    if width > max_width or height > max_height:
        # Calculate the new dimensions while maintaining the aspect ratio
        scaling_factor = min(max_width / width, max_height / height)
        new_width = int(width * scaling_factor)
        new_height = int(height * scaling_factor)
        return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    return image

# Loop through all files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        # Open the image file
        with Image.open(os.path.join(directory, filename)) as img:
            # Resize the image
            resized_img = resize_image(img, 1000, 1000)
            # Save the resized image to the output directory
            resized_img.save(os.path.join(output_directory, filename))
            print(f"Resized and saved: {filename}")

print("All images resized and saved successfully.")
