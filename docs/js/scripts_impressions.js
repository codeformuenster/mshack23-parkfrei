const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const slider = document.getElementById("slider");
const imageSelect = document.getElementById("imageSelect");
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const detectSubmit = document.getElementById('detect_submit');

import {
    ObjectDetector,
    FilesetResolver,
    // Detection,
    // ObjectDetectionResult
  } from "/assets/tasks-vision.min.js";
  
let objectDetector;
let runningMode = "IMAGE";

// Initialize the object detector
const initializeObjectDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "assets/wasm"
    );
    objectDetector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `assets/efficientdet_lite0.tflite`,
        delegate: "GPU"
      },
      scoreThreshold: 0.3,
      runningMode: runningMode
    });
    // demosSection.classList.remove("invisible");
  };
  initializeObjectDetector();


detectSubmit.addEventListener("click", handleClick);


/**
 * Detect objects in still images on click
 */
async function handleClick(event) {
    const highlighters = event.target.parentNode.getElementsByClassName(
      "highlighter"
    );
    while (highlighters[0]) {
      highlighters[0].parentNode.removeChild(highlighters[0]);
    }
  
    const infos = event.target.parentNode.getElementsByClassName("info");
    while (infos[0]) {
      infos[0].parentNode.removeChild(infos[0]);
    }
  
    if (!objectDetector) {
      alert("Object Detector is still loading. Please try again.");
      return;
    }
  
    // if video mode is initialized, set runningMode to image
    if (runningMode === "VIDEO") {
      runningMode = "IMAGE";
      await objectDetector.setOptions({ runningMode: "IMAGE" });
    }
  
    const ratio = event.target.height / event.target.naturalHeight;
  
    // objectDetector.detect returns a promise which, when resolved, is an array of Detection objects
    const detections = objectDetector.detect(previewImage);
    console.log(detections);
    displayImageDetections(detections, previewImage);
  }

  function displayImageDetections(
    result,
    resultElement
  ) {
    const ratio = resultElement.height / resultElement.naturalHeight;
    console.log(ratio);
  
    for (let detection of result.detections) {
      // Description text
      const p = document.createElement("p");
      p.setAttribute("class", "info");
      p.innerText =
        detection.categories[0].categoryName +
        " - with " +
        Math.round(parseFloat(detection.categories[0].score) * 100) +
        "% confidence.";
      // Positioned at the top left of the bounding box.
      // Height is whatever the text takes up.
      // Width subtracts text padding in CSS so fits perfectly.
      p.style =
        "left: " +
        detection.boundingBox.originX * ratio +
        "px;" +
        "top: " +
        detection.boundingBox.originY * ratio +
        "px; " +
        "width: " +
        (detection.boundingBox.width * ratio - 10) +
        "px;";
      const highlighter = document.createElement("div");
      highlighter.setAttribute("class", "highlighter");
      highlighter.style =
        "left: " +
        detection.boundingBox.originX * ratio +
        "px;" +
        "top: " +
        detection.boundingBox.originY * ratio +
        "px;" +
        "width: " +
        detection.boundingBox.width * ratio +
        "px;" +
        "height: " +
        detection.boundingBox.height * ratio +
        "px;";
  
      resultElement.parentNode.appendChild(highlighter);
      resultElement.parentNode.appendChild(p);
    }
  }


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