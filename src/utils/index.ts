export default {
  setFullScreen(): boolean {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return false;
    } else {
      document.documentElement.requestFullscreen();
      return true;
    }
  },
};
