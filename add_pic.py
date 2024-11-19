import os
from termcolor import colored as c

while True:
    pic_name = input("Enter name of file (no extension): ")

    if pic_name.strip().lower() == 'clear':
        os.system('clear')
        print()
        continue

    if pic_name.strip().lower() == 'exit':
        break

    confirm = input(f"Is the name \"{pic_name}\" correct? (y/n) : ")
    
    if confirm.strip().lower() == 'exit':
        break

    if confirm.strip().upper() in ["YES", "Y"]:
        return_code = os.system(f"mv \"../Downloads/{pic_name}\".jpg src/assets/real_pics/")

        if return_code == 0:
            print(c(f'The image \"{pic_name}\".jpg was saved successfully!\n', 'green'))
        else:
            print(c(f'An error occurred while saving the \"{pic_name}\".jpg image!\n', 'red'))

