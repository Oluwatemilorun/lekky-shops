export const state = () => ({
  login: false,
  signup: false
});

export const mutations = {
  initLogin(state, value) {
    state.login = value;
    state.signup = false;
  },
  initSignup(state, value) {
    state.signup = value;
    state.login = false;
  }
};
