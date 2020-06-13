export const state = () => ({
  admin: null,
  isSignedIn: false,
  fullscreen: false,
  title: 'overview'
});

export const mutations = {
  setAdmin(state, admin) {
    state.admin = admin || null;
    state.isSignedIn = !!admin;
  },
  toggleFullscreen(state, fullscreen) {
    state.fullscreen = fullscreen;
  },
  setPageTitle(state, title) {
    state.pageTitle = title;
  },
  setBreadcrumbs(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  },
  toggleSidenav(state) {
    state.sidenav = !state.sidenav;
  },
  hideSidenav(state) {
    state.sidenav = false;
  },
  showSidenav(state) {
    state.sidenav = true;
  }
};

export const getters = {
  isSignedIn(state) {
    return state.isSignedIn;
  },
  loggedAdmin(state) {
    return state.admin;
  }
};
