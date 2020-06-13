export const state = () => ({
  active: true
});

export const mutations = {
  show(state) {
    state.active = true;
  },
  hide(state) {
    state.active = false;
  }
};
