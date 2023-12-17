const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreen");
const fullscreenBtnIcon = fullscreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeRemember = 0.5;
video.volume = volumeRemember;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
    video.volume = volumeRemember;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeRemember;
};

const handleInputVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
  if (value == 0) {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  video.volume = value;
};

const handleChangeVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (value != 0) {
    volumeRemember = value;
  }
};

const formatTime = (seconds) => {
  const startIdx = seconds >= 3600 ? 12 : 14;
  return new Date(seconds * 1000).toISOString().substring(startIdx, 19);
};

const handleLoadedMetadata = () => {
  if (video.duration < 3600) {
    currentTime.innerText = "00:00";
  }
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

let videoPlayStatus = false;
let setVideoPlayStatus = true;

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = false;
  }
  video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = true;
};

const handleSkipAtFocus = () => {
  window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft" || "ArrowRight") {
      event.preventDefault();
    }
    if (event.key == "ArrowRight") {
      video.currentTime += 5;
    } else if (event.key == "ArrowLeft") {
      video.currentTime -= 5;
    }
  });
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};

const handleFullscreenBtn = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    fullscreenBtnIcon.classList = "fas fa-compress";
  } else {
    fullscreenBtnIcon.classList = "fas fa-expand";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    handlePlayClick();
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "m") {
    handleMute();
  }
});
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleInputVolumeRange);
volumeRange.addEventListener("change", handleChangeVolumeRange);
timeline.addEventListener("input", handleTimelineChange);
timeline.addEventListener("change", handleTimelineSet);
timeline.addEventListener("focus", handleSkipAtFocus);
fullscreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("fullscreenchange", handleFullscreenBtn);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayClick);
video.addEventListener("timeupdate", handleTimeUpdate);
video.readyState
  ? handleLoadedMetadata()
  : video.addEventListener("loadeddata", handleLoadedMetadata);
