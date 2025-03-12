const modelURL = "my_model/model.json";
const metadataURL = "my_model/metadata.json";
let model, webcam;

async function init() {
    model = await tmImage.load(modelURL, metadataURL);
    console.log("Model Loaded!");

    // Set up the webcam
    webcam = document.getElementById("webcam");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => webcam.srcObject = stream)
        .catch(error => console.error("Webcam error:", error));
}

async function predict() {
    const prediction = await model.predict(webcam);
    const bestMatch = prediction.reduce((prev, current) => 
        prev.probability > current.probability ? prev : current
    );

    document.getElementById("result").innerText = 
        `Prediction: ${bestMatch.className} (${(bestMatch.probability * 100).toFixed(2)}%)`;
}

init();
