try:
    from PIL import Image
except ImportError:
    import Image

import pytesseract
import pdftotext

# print(pytesseract.get_languages(config='')) # print all languages

# data class which represent data of image
class FILE_DATA:
    image_name = "empty" # holds image name to delete if when going back home

class OCR_CORE:

    # PDF READING
    @staticmethod
    def __return_pdf_doc_content(pathToDoc):
        file = open(pathToDoc, "rb")
        pdf = pdftotext.PDF(file, "secret")
        content = ""
        for page in pdf:
            content += page

        return str(content)

    @staticmethod
    def __print_pdf_document_content(pathToDocument):
        file = open(pathToDocument, "rb")
        pdf = pdftotext.PDF(file, "secret")
        for page in pdf:        
            print("content - " + str(page))
    
    # Image reading
    @staticmethod
    def __read_image(pathToImage):
        # image to string
        print("\ntext : " + pytesseract.image_to_string(Image.open(pathToImage)))

    @staticmethod
    def __return_image(pathToImage):
        # return data obtanined from .png file
        return pytesseract.image_to_string(Image.open(pathToImage))

    @staticmethod
    def __return_languages():
        return pytesseract.get_languages(config='')

    # public methods
    @staticmethod
    def return_content_of_file(pathToFile):
        result = "extension_error"

        if pathToFile.lower().endswith(('.png', '.jpg', '.jpeg')):
            result =  OCR_CORE.__return_image(pathToFile)
        elif pathToFile.lower().endswith(('.pdf')):
            result = OCR_CORE.__return_pdf_doc_content(pathToFile)
        
        if not result.strip():
            result = "There was no text in image"

        return result
    
    @staticmethod
    def return_name_of_file(filename):
        filename = str(filename)
        filename_ext = filename.split('.')
        return filename_ext[0]

    @staticmethod
    def create_txt_file(filename):
        open(str(filename), "w+")
    
    @staticmethod
    def create_and_write_txt_file(filename, content):
        f = open(str(filename), "w+")
        f.write(str(content))


# print_pdf_document_content("test2.pdf")
# print("content\n" + OCR_CORE.return_content_of_file('test2.png'))
# print("--- testing data --- " + return_image("text.png"))
# print(OCR_CORE.return_name_of_file("asdasd.png"))
# OCR_CORE.create_and_write_txt_file("uploaded/" + OCR_CORE.return_name_of_file('asdad.png'), "testowa zawartosc")