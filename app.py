from flask import Flask, jsonify, render_template, request
import cv2
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load the machine learning model for image recognition
model = tf.keras.models.load_model('model.h5')
classes = ['potato', 'rice', 'mustard']  # Define the classes your model can recognize

# Data for water footprints
water_footprints = {
    'potato': '287 liters per kilogram',
    'rice': '2,500 liters per kilogram',
    'mustard': '1,000 liters per kilogram'
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def data():
    product = request.args.get('product', '').lower()
    footprint = water_footprints.get(product, 'Product not found or footprint data unavailable')
    return jsonify({'footprint': footprint})

@app.route('/api/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'product': None, 'footprint': 'No image uploaded'})

    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    image = cv2.resize(image, (64, 64))  # Resize to the input size of your model
    image = np.array(image) / 255.0  # Normalize image to [0, 1]
    image = np.expand_dims(image, axis=0)

    # Predict the class
    prediction = model.predict(image)
    class_index = np.argmax(prediction)
    product = classes[class_index]
    footprint = water_footprints.get(product, 'Footprint data unavailable')

    return jsonify({'product': product, 'footprint': footprint})

if __name__ == '__main__':
    app.run(debug=True)
