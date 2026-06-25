from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from model.predict import predict_disease
from utils.disease_info import disease_treatment

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16MB max limit

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
        
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Make prediction
        disease, confidence = predict_disease(filepath)
        
        # Get treatment info
        info = disease_treatment.get(disease, {"treatment": "Consult a local agricultural expert.", "prevention": "Maintain overall plant health."})
        
        return render_template('result.html', 
                             disease=disease, 
                             confidence=round(confidence * 100, 2),
                             treatment=info['treatment'],
                             prevention=info['prevention'],
                             image_url=filepath)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
