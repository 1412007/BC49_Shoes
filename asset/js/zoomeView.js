const imageContainer = document.querySelector('#shoe-detail .content_left');
const zoomImage = document.querySelector('#shoe-image');

imageContainer.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX - imageContainer.getBoundingClientRect().left;
  const mouseY = e.clientY - imageContainer.getBoundingClientRect().top;

  const zoomX = (mouseX / imageContainer.offsetWidth) * 100;
  const zoomY = (mouseY / imageContainer.offsetHeight) * 100;

  zoomImage.style.backgroundPosition = `${zoomX}% ${zoomY}%`;
});