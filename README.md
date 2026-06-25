# AgriCare AI: Intelligent Crop Disease Detection System

![AgriCare AI](static/uploads/preview.png) *(Preview Placeholder)*

AgriCare AI is a web-based application built to help farmers identify crop diseases instantly. By simply uploading a photo of a crop leaf, the system utilizes an advanced Convolutional Neural Network (CNN) to predict the disease and provide actionable treatment and prevention recommendations.

This project directly aligns with **United Nations SDG 2: Zero Hunger**, by reducing crop losses, improving agricultural productivity, and supporting sustainable farming practices.

## Features
- **Instant Diagnosis:** Upload a leaf image and get results in under 3 seconds.
- **Accurate Disease Prediction:** AI-powered classification supporting multiple crop and disease types.
- **Actionable Recommendations:** Get targeted treatment and prevention advice alongside your diagnosis.
- **Modern User Interface:** A premium, glassmorphism-inspired design that is simple and farmer-friendly.
- **Detailed Confidence Scores:** Understand the model's certainty with visual progress bars.

## Supported Crops & Diseases (PlantVillage Dataset)
* Tomato: Early Blight, Late Blight, Leaf Mold
* Potato: Early Blight, Late Blight
* Corn: Common Rust, Northern Leaf Blight
* Healthy Leaves (for baseline comparison)

## Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Glassmorphism Design), JavaScript
* **Backend:** Python, Flask
* **Machine Learning:** TensorFlow, Keras, OpenCV, NumPy
* **Presentation Generation:** python-pptx

## Live Deployment 🌐
The frontend of the application is hosted live and can be accessed from any device here:
👉 **[https://agricare-ai-blush.vercel.app/](https://agricare-ai-blush.vercel.app/)**

## Local Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/ROHIT-PR22/agricare-ai.git
cd agricare-ai
```

### 2. Install dependencies
Make sure you have Python installed, then run:
```bash
pip install -r requirements.txt
```

### 3. Run the Application
Start the Flask backend server:
```bash
python app.py
```
Then, open your web browser and navigate to `http://127.0.0.1:5000`. 
*(Note: The app runs out-of-the-box using a simulated prediction engine for demonstration purposes).*

## Training the Model
To train the CNN model on the actual PlantVillage dataset:
1. Download the [PlantVillage dataset](https://github.com/spMohanty/PlantVillage-Dataset) and place it in a `plantvillage_dataset/` directory inside the project root.
2. Run the training script:
   ```bash
   python model/train_model.py
   ```
3. Once completed, the trained model will be saved as `agricare_model.h5`. The Flask app will automatically detect and use this model for real predictions!

## Generate Capstone Presentation
This repository includes an automated script to generate a 12-slide Capstone Project presentation deck (`.pptx`).
```bash
python generate_ppt.py
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.
