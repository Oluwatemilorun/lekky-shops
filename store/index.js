export const state = () => ({
  sidebar: false
});

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  }
};

export const actions = {
  nuxtServerInit: ({ commit }, { $axios }) => {
    $axios.get(`/api/categories`).then(({ data }) => {
      commit('category/setCategories', data.payload);
    });
  }
};
