document.addEventListener("DOMContentLoaded", async function () {
  const playButton = document.querySelector(".play i");
  const audio = document.querySelector('audio');
  const progressBar = document.getElementById('progressBar');
  const minutosCorridos = document.getElementById('minutosCorridos');
  const minutosTotales = document.getElementById('minutosTotales');

  let audios = []
  let currentAudioIndex = 0;
  let wasPlaying = !audio.paused;

  playButton.addEventListener("click", togglePlayPause);
  progressBar.addEventListener('input', updateProgressBar);
  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', loadMetadata);
  document.querySelector('.fa-forward-step').addEventListener('click', nextAudio);
  document.querySelector('.fa-backward-step').addEventListener('click', previousAudio);

  try {
    const response = await fetch('./db.json');
    const data = await response.json();
    audios = data.songs;
    updateAudio();
  } catch (error) {
    console.error('Error fetching audio data:', error);
  }

  function togglePlayPause() {
    const icon = this;
    const isPlaying = icon.classList.contains("fa-circle-pause");
    icon.classList.remove(isPlaying ? "fa-circle-pause" : "fa-circle-play");
    icon.classList.add(isPlaying ? "fa-circle-play" : "fa-circle-pause");
    isPlaying ? audio.pause() : audio.play();
  }

  function updateProgressBar() {
    const percent = this.value;
    const duration = audio.duration;
    audio.currentTime = (percent / 100) * duration;
  }

  function updateTime() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const percent = (currentTime / duration) * 100;

    progressBar.value = percent;

    const gradientColor = `linear-gradient(to right, #1ed760 0%, #1ed760 ${percent}%, #4D4D4D ${percent}%, #4D4D4D 100%)`;
    progressBar.style.background = gradientColor;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    minutosCorridos.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function loadMetadata() {
    const duration = audio.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    minutosTotales.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function nextAudio() {
    wasPlaying = !audio.paused;
    currentAudioIndex = (currentAudioIndex + 1) % audios.length;
    updateAudio();
  }

  function previousAudio() {
    wasPlaying = !audio.paused;
    currentAudioIndex = (currentAudioIndex - 1 + audios.length) % audios.length;
    updateAudio();
  }

  function updateAudio() {
    const currentAudio = audios[currentAudioIndex];
    audio.src = currentAudio.src;

    const imgElement = document.querySelector('.info .img img');
    imgElement.src = currentAudio.img;

    const nameElement = document.querySelector('.info .name');
    const artistElement = document.querySelector('.info .artist');

    nameElement.textContent = currentAudio.name;
    artistElement.textContent = currentAudio.artist;

    if (wasPlaying) {
      audio.play();
    }

    const icon = document.querySelector('.fa-play-circle');
    icon.classList.remove('fa-play-circle');
    icon.classList.add('fa-circle-pause');
  }
});