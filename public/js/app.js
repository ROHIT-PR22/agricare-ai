// Disease data with treatments
const diseaseData = {
    "Tomato Early Blight": {
        treatment: "Apply copper-based fungicide. Remove affected leaves and dispose of them properly.",
        prevention: "Avoid overhead watering, ensure good air circulation, and practice crop rotation."
    },
    "Tomato Late Blight": {
        treatment: "Apply fungicides containing chlorothalonil or copper. Remove and destroy infected plants immediately.",
        prevention: "Remove infected leaves, ensure proper spacing between plants, and avoid watering in the evening."
    },
    "Tomato Leaf Mold": {
        treatment: "Improve ventilation and reduce humidity. Apply appropriate fungicide if severe.",
        prevention: "Water at the base of the plant, increase plant spacing, and ensure greenhouse ventilation."
    },
    "Potato Early Blight": {
        treatment: "Use Mancozeb or chlorothalonil spray at the first sign of disease.",
        prevention: "Practice crop rotation, maintain adequate nitrogen levels, and remove plant debris."
    },
    "Potato Late Blight": {
        treatment: "Apply targeted fungicides such as Mancozeb or copper-based sprays immediately.",
        prevention: "Use certified disease-free seed potatoes and avoid overhead irrigation."
    },
    "Corn Common Rust": {
        treatment: "Apply sulfur or copper fungicide early when pustules first appear.",
        prevention: "Plant rust-resistant hybrids and ensure proper field drainage."
    },
    "Corn Northern Leaf Blight": {
        treatment: "Apply fungicide in severe cases, ideally before tasseling stage.",
        prevention: "Practice crop rotation, tillage to reduce residue, and plant resistant varieties."
    },
    "Healthy Leaf": {
        treatment: "No treatment required! Your crop leaf appears healthy.",
        prevention: "Continue regular maintenance, proper watering, and balanced fertilization."
    }
};

const diseaseNames = Object.keys(diseaseData);

// DOM Elements
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const uploadContent = document.getElementById('upload-content');
const predictBtn = document.getElementById('predict-btn');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const homePage = document.getElementById('home-page');
const resultPage = document.getElementById('result-page');
const scanAgainBtn = document.getElementById('scan-again-btn');

// Drag & Drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); }, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
});

dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        handleFile(files[0]);
    }
}, false);

dropArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', function () {
    if (this.files.length) handleFile(this.files[0]);
});

function handleFile(file) {
    if (!file.type.match('image.*')) {
        alert("Please select an image file (JPG, PNG, or WEBP).");
        return;
    }
    const reader = new FileReader();
    reader.onload = e => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        uploadContent.style.display = 'none';
        predictBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

// Predict
predictBtn.addEventListener('click', () => {
    btnText.textContent = "Analyzing...";
    btnLoader.style.display = 'block';
    predictBtn.disabled = true;

    // Simulate AI processing
    setTimeout(() => {
        const disease = diseaseNames[Math.floor(Math.random() * diseaseNames.length)];
        const confidence = (Math.random() * 14 + 85).toFixed(2); // 85-99%

        const info = diseaseData[disease];

        // Populate result
        document.getElementById('result-image').src = imagePreview.src;
        document.getElementById('disease-name').textContent = disease;
        document.getElementById('confidence-val').textContent = confidence + '%';
        document.getElementById('treatment-text').textContent = info.treatment;
        document.getElementById('prevention-text').textContent = info.prevention;

        // Switch pages
        homePage.style.display = 'none';
        resultPage.style.display = 'block';

        // Animate progress bar
        setTimeout(() => {
            document.getElementById('progress-bar').style.width = confidence + '%';
        }, 100);

        // Reset button
        btnText.textContent = "Predict Disease";
        btnLoader.style.display = 'none';
    }, 1500);
});

// Scan Again
scanAgainBtn.addEventListener('click', () => {
    resultPage.style.display = 'none';
    homePage.style.display = 'block';
    imagePreview.style.display = 'none';
    uploadContent.style.display = 'flex';
    predictBtn.disabled = true;
    fileInput.value = '';
    document.getElementById('progress-bar').style.width = '0%';
});
