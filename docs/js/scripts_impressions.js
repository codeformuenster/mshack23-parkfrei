const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const slider = document.getElementById("slider");
const imageSelect = document.getElementById("imageSelect");

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