document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play i");
  const audio = document.querySelector('audio');
  const progressBar = document.getElementById('progressBar');
  const minutosCorridos = document.getElementById('minutosCorridos');

  playButton.addEventListener("click", function () {
    const icon = this;

    if (icon.classList.contains("fa-circle-play")) {
      icon.classList.remove("fa-circle-play");
      icon.classList.add("fa-circle-pause");
      audio.play();
    } else if (icon.classList.contains("fa-circle-pause")) {
      icon.classList.remove("fa-circle-pause");
      icon.classList.add("fa-circle-play");
      audio.pause();
    }
  });

  progressBar.addEventListener('input', function() {
    const percent = this.value;
    const duration = audio.duration;
    audio.currentTime = (percent / 100) * duration;
  });

  audio.addEventListener('timeupdate', function() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const percent = (currentTime / duration) * 100;
  
    progressBar.value = percent;
  
    // Cambiar el color de fondo de la barra de progreso según el porcentaje completado
    const gradientColor = `linear-gradient(to right, #1ed760 0%, #1ed760 ${percent}%, #4D4D4D ${percent}%, #4D4D4D 100%)`;
    progressBar.style.background = gradientColor;
  
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    minutosCorridos.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  });
});
