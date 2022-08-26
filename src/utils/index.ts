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
  isDarkMode(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  },
  isMobile(): boolean {
    const w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return w <= 500;
  },
  goPage(val: string): void {
    console.warn('goPage');
  },
};
