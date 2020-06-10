export const state = () => ({
  vendor: []
});

export const mutations = {
  setVendorAlerts(state, markup) {
    state.vendor.push(markup);
  },
  clearAll(state) {
    state.vendor = [];
  }
};

export const getters = {};
