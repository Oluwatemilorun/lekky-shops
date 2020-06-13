export const state = () => ({
  show: false,
  text: 'Please stand by...'
});

export const mutations = {
  show(state, text) {
    state.show = true;
    state.text = text;
  },
  hide(state, value) {
    state.show = false;
    state.login = 'Please stand by...';
  }
};
