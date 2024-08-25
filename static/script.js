document.getElementById('fetchData').addEventListener('click', () => {
    const product = document.getElementById('productInput').value.trim().toLowerCase();
    
    fetch(`/api/data?product=${product}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = `Water Footprint for ${product}: ${data.footprint}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

document.getElementById('uploadImage').addEventListener('click', () => {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = `Water Footprint for ${data.product}: ${data.footprint}`;
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    } else {
        document.getElementById('result').innerText = 'Please upload an image first.';
    }
});
