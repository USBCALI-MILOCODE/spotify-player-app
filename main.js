document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play i");
  const audio = document.querySelector('audio');

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
});
