export const state = () => ({
  hasScrolled: false,
  scrollY: 0
});

export const mutations = {
  onScroll(state, e) {
    state.hasScrolled = !!(
      window.pageYOffset > 300 || document.documentElement.scrollTop > 300
    );
    state.scrollY = window.pageYOffset || document.documentElement.scrollTop;
  },
  scrollCallback(state, callback) {
    if (typeof callback === 'function') callback(state.scrollY);
  }
};
