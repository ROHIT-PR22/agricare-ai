document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');
    const uploadContent = document.querySelector('.upload-content');
    const predictBtn = document.getElementById('predict-btn');
    const uploadForm = document.getElementById('upload-form');
    const loader = document.getElementById('btn-loader');
    const btnText = predictBtn.querySelector('span');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropArea.classList.add('dragover');
    }

    function unhighlight(e) {
        dropArea.classList.remove('dragover');
    }

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if(files.length) {
            fileInput.files = files;
            handleFiles(files[0]);
        }
    }

    // Click to upload
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if(this.files.length) {
            handleFiles(this.files[0]);
        }
    });

    function handleFiles(file) {
        if (!file.type.match('image.*')) {
            alert("Please select an image file.");
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadContent.style.display = 'none';
            predictBtn.disabled = false;
        };
        
        reader.readAsDataURL(file);
    }

    // Form submission animation
    uploadForm.addEventListener('submit', () => {
        btnText.textContent = "Analyzing...";
        loader.style.display = 'block';
        predictBtn.disabled = true;
        dropArea.style.pointerEvents = 'none';
    });
});
