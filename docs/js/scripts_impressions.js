const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const slider = document.getElementById("slider");
const imageSelect = document.getElementById("imageSelect");
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');

function updateImageVisibility() {
    const sliderValue = slider.value;

    // Set opacity for image1 and image2 based on the slider value
    // image1.style.opacity = 1 - sliderValue;
    image2.style.opacity = sliderValue;
}

function loadSelectedImagePair() {
    const selectedPair = imageSelect.value;

    // Load the selected image pair based on the dropdown value
    if (selectedPair === "pair1") {
        image1.src = "assets/img/street_1_0.jpg";
        image2.src = "assets/img/street_1_1.jpg";
    } else if (selectedPair === "pair2") {
        image1.src = "assets/img/street_2_0.jpg"; 
        image2.src = "assets/img/street_2_1.jpg"; 
    } else if (selectedPair === "pair3") {
        image1.src = "assets/img/street_3_0.jpg"; 
        image2.src = "assets/img/street_3_1.jpg"; 
    }  else if (selectedPair === "pair4") {
        image1.src = "assets/img/street_4_0.jpg"; 
        image2.src = "assets/img/street_4_1.jpg"; 
    }  else if (selectedPair === "pair5") { // source: https://www.instagram.com/p/Cw7uKYyuZNt/
        image1.src = "assets/img/street_5_0.jpg"; 
        image2.src = "assets/img/street_5_1.jpg"; 
    }  else if (selectedPair === "pair6") { // source: https://www.instagram.com/p/CvP17gKOcvd/?img_index=1
        image1.src = "assets/img/street_6_0.jpg"; 
        image2.src = "assets/img/street_6_1.jpg"; 
    }  else if (selectedPair === "pair7") { // source: https://www.instagram.com/p/Cur3MMVO9J4/?img_index=1
        image1.src = "assets/img/street_7_0.jpg"; 
        image2.src = "assets/img/street_7_1.jpg"; 
    } 
    // Add more conditions for other image pairs as needed

    slider.value = 0;
    updateImageVisibility();
}

slider.addEventListener("input", updateImageVisibility);
imageSelect.addEventListener("change", loadSelectedImagePair);

// Initialize the visibility
updateImageVisibility();
loadSelectedImagePair();

// Handle file selection via input
fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    handleFile(file);
});

// Function to handle the selected/dropped file
function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
}