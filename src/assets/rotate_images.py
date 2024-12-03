import os
from PIL import Image, ImageOps

main_directory = 'real_menu/pics'

subdirs = [
    "ChocolateStrawberries"
]

def rotate_image(image, rotation_angle):
    """Rotates the image by the specified angle."""
    return image.rotate(rotation_angle, expand=True)


for subdir in subdirs:
    subdir_path = os.path.join(main_directory, subdir)
    if not os.path.exists(subdir_path):
        print(f"Directory does not exist: {subdir_path}")
        continue 

    print(f"Processing directory: {subdir_path}")
    
    for filename in os.listdir(subdir_path):
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            file_path = os.path.join(subdir_path, filename)
            try:
                with Image.open(file_path) as img:
                    img = ImageOps.exif_transpose(img)


                    print(f"\nImage: {file_path}")

                    while True:
                        try:
                            rotation_angle = int(input("Enter the rotation angle (in degrees, e.g., 90, -90, 180, etc.): "))
                            break
                        except ValueError:
                            print("Invalid input. Please enter a valid number.")

                    rotated_img = rotate_image(img, rotation_angle)

                    rotated_img.save(file_path)
                    print(f"Rotated and saved: {file_path}")
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print("All images processed successfully.")
