// Function to access the webcam
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      const video = document.getElementById('video');
      video.srcObject = stream;
      video.play(); // Start playing the video stream
    })
    .catch((err) => {
      console.error("Error accessing the camera: ", err);
      document.getElementById('result').textContent = "Unable to access the camera. Please check your browser settings.";
    });
}

// Function to capture the image from video feed
function captureImage() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // Set the canvas width and height to match the video feed
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Draw the current frame of the video on the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Convert the canvas image to a data URL (Base64 format)
  const imageData = canvas.toDataURL('image/png');

  // Send the image data to the server for processing
  fetch('/api/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: imageData })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('result').textContent = `Water Footprint: ${data.footprint} liters`;
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('result').textContent = 'Error calculating the water footprint. Please try again.';
  });
}

// Start the camera when the page loads
window.onload = function() {
  startCamera();
};

// Add event listener to the capture button
document.getElementById('capture-btn').addEventListener('click', captureImage);
