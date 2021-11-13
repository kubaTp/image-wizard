import os

from flask import Flask, render_template, request, redirect, send_from_directory 
from ocr_core import read_image, return_image, Data
from os.path import exists

app = Flask(__name__)

@app.route('/')
def home():
  return redirect('/home')

@app.route('/home')
def index():
  return render_template('index.html')

@app.route('/read-image/', methods=['POST'])
def my_link():

  # redericting to home
  if request.form.get('go_home_button') == 'image wizard':
    file_path = os.path.dirname(os.path.realpath('__file__')) + "/uploaded/" + Data.image_name

    if exists(file_path):
      os.remove(file_path)

    return redirect('/home')


  uploaded_file = request.files['file']

  # when file was uploaded
  if uploaded_file.filename != '':
    uploaded_file.save("uploaded/" + uploaded_file.filename)
    Data.image_name = uploaded_file.filename
    return render_template('image.html', text = format(return_image("uploaded/" + uploaded_file.filename)))


#@app.route('/favicon.ico') 
#def favicon(): 
    #return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
  app.run(debug = True)
