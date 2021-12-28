import os

from flask import Flask, render_template, request, redirect, send_from_directory, send_file
from ocr_core import FILE_DATA, OCR_CORE
from os.path import exists
import pyperclip as pc
from server_action import fileService
from threading import Thread

class ImageWizzardFlaskApp(Flask):
  def run(self, host="127.0.0.1", port=5000, debug=None, load_dotenv=True, **options):
    if not self.debug or os.getenv('WERKZEUG_RUN_MAIN') == 'true':
      with self.app_context():
        file_thread = Thread(target=fileService, args=(1, ), daemon=True)
        file_thread.start()

    super(ImageWizzardFlaskApp, self).run(host=host, port=port, debug=debug, load_dotenv=load_dotenv, **options)

app = ImageWizzardFlaskApp(__name__)

# main redirects to home
@app.route('/')
def home():
  return redirect('/home')

@app.route('/home')
def index():
  return render_template('index.html')

@app.route('/read-image/', methods=['POST'])
def my_link():

  # redericting to home -> add removing txt.file
  if request.form.get('go_home_button') == 'image wizard':
    file_path = os.path.dirname(os.path.realpath('__file__')) + "/uploaded/" + FILE_DATA.image_name
    txt_file_path = os.path.dirname(os.path.realpath('__file__')) + "/uploaded/" + OCR_CORE.return_name_of_file(FILE_DATA.image_name) + ".txt"
    if exists(file_path):
      os.remove(file_path)
      if os.path.isfile(txt_file_path):
        os.remove(txt_file_path)
        
    return redirect('/home')
  
  # download txt file
  if request.form.get('download_txt_file') == "download .txt file with your text":
    textContent = OCR_CORE.return_content_of_file(("uploaded/" + FILE_DATA.image_name))
    txt_filename = OCR_CORE.return_name_of_file(FILE_DATA.image_name) + ".txt"
    OCR_CORE.create_and_write_txt_file("uploaded/" + txt_filename, textContent)
    path = "uploaded/" + txt_filename
    return send_file(path, as_attachment=True)
  
  if request.form.get("copy_to_clipboard") == "copy your text to clipboard":
    textContent = textContent = OCR_CORE.return_content_of_file(("uploaded/" + FILE_DATA.image_name))
    pc.copy(textContent) # copy image content to clipboard
    return render_template('image.html', text = textContent)

  uploaded_file = request.files['file']

  # when file was uploaded
  if uploaded_file.filename != '':
    uploaded_file.save("uploaded/" + uploaded_file.filename)
    FILE_DATA.image_name = uploaded_file.filename

    textContent = OCR_CORE.return_content_of_file(("uploaded/" + uploaded_file.filename))

    return render_template('image.html', text = textContent)


#@app.route('/favicon.ico') 
#def favicon(): 
    #return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
  app.run(port = 3000)
