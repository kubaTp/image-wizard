try:
    from PIL import Image
except ImportError:
    import Image

import pytesseract

# print(pytesseract.get_languages(config='')) # print all languages

def read_image(pathToImage):
    # image to string
    print("\ntext : " + pytesseract.image_to_string(Image.open(pathToImage)));

def return_image(pathToImage):
    # return data obtanined from .png file
    return pytesseract.image_to_string(Image.open(pathToImage));

def return_languages():
    return pytesseract.get_languages(config='')

# data class which represent data of image
class Data:
    image_name = "empty" # holds image name to delete if when going back home
    
#print("--- BOX ---\n" + pytesseract.image_to_boxes("text.png"));