window.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('imageInput');
  const imagePreview = document.getElementById('imagePreview');
  const grayscaleBtn = document.getElementById('grayscaleBtn');
  const blurBtn = document.getElementById('blurBtn');
  const manualResizeBtn = document.getElementById('manualResizeBtn');
  manualResizeBtn.addEventListener('click', manualResizeImage);

  function applyGrayscale() {
    // Fungsi untuk memproses gambar menjadi grayscale
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = imagePreview.src;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
      context.putImageData(imageData, 0, 0);
      imagePreview.src = canvas.toDataURL();
  
      const downloadBtn = document.getElementById('downloadBtn');
      downloadBtn.style.display = 'inline-block'; // Memunculkan tombol unduh
      downloadBtn.addEventListener('click', () => {
        downloadImage(canvas.toDataURL());
      });
    };
  }
  

  function applyBlur() {
    // Fungsi untuk memproses gambar dengan efek blur
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = imagePreview.src;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.filter = 'blur(8px)';
      context.drawImage(image, 0, 0);
      imagePreview.src = canvas.toDataURL();
  
      const downloadBtn = document.getElementById('downloadBtn');
      downloadBtn.style.display = 'inline-block'; // Memunculkan tombol unduh
      downloadBtn.addEventListener('click', () => {
        downloadImage(canvas.toDataURL());
      });
    };
  }

  function downloadImage(dataURL) {
    // Fungsi untuk membuat tautan unduhan gambar
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'processed_image.png'; // Nama file yang akan diunduh (ganti sesuai kebutuhan)
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function manualResizeImage() {
    // Fungsi untuk meresize gambar dengan dimensi yang diinput pengguna
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = imagePreview.src;
    image.onload = () => {
      const newWidthInput = parseInt(prompt('Masukkan lebar baru (dalam piksel):'));
      const newHeightInput = parseInt(prompt('Masukkan tinggi baru (dalam piksel):'));

      if (!isNaN(newWidthInput) && !isNaN(newHeightInput) && newWidthInput > 0 && newHeightInput > 0) {
        const newWidth = Math.min(newWidthInput, image.width); // Menjaga aspek rasio gambar
        const newHeight = Math.min(newHeightInput, image.height); // Menjaga aspek rasio gambar

        canvas.width = newWidth;
        canvas.height = newHeight;
        context.drawImage(image, 0, 0, newWidth, newHeight);
        imagePreview.src = canvas.toDataURL();
      } else {
        alert('Dimensi yang dimasukkan tidak valid.');
      }
    };
  }

  grayscaleBtn.addEventListener('click', applyGrayscale);
  blurBtn.addEventListener('click', applyBlur);
});

function compressAudio() {
  const inputFile = document.getElementById('inputFile').files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const audio = document.getElementById('outputAudio');
    audio.src = event.target.result;

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = event.target.result;
    downloadLink.download = 'compressed_audio.mp3'; // Nama file yang akan diunduh (ganti sesuai kebutuhan)
    downloadLink.style.display = 'block';
  };

  reader.readAsDataURL(inputFile);
}

