
document.getElementById('btn').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission

  const fileInput = document.getElementById('image-input');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('image', file);

  fetch("http://localhost:3000/analyze", {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      const colorList = document.getElementById('color-list');
      colorList.innerHTML = '';

      for (const key in data) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: [${data[key].join(', ')}]`;
        colorList.appendChild(listItem);
      }

      document.getElementById('result-container').style.display = 'block';

    })
    .catch(error => {
      console.error('Analyze request error:', error);
      alert('Failed to analyze the image');
    });

});