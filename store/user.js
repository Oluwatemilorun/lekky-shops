// eslint-disable-next-line no-unused-vars
import { getTokenFromCookie, getUserFromLocalStorage } from '~/utils/auth';

export const state = () => ({
  user: null,
  isSignedIn: false,
  menu: [
    {
      text: 'My Profile',
      icon: 'mdi-account',
      url: '/account/profile/me'
    },
    {
      text: 'My Interest',
      icon: 'mdi-hexagon-multiple',
      url: '/account/profile/cart'
    },
    {
      text: 'My Appointments',
      icon: 'mdi-calendar-multiple',
      url: '/account/profile/appointment'
    },
    {
      text: 'My Bookings',
      icon: 'mdi-book-multiple',
      url: '/account/profile/bookings'
    },
    {
      text: 'My Invoices',
      icon: 'mdi-file-document',
      url: '/account/profile/invoices'
    },
    {
      text: 'My Favourite Items',
      icon: 'mdi-heart',
      url: '/account/profile/favourites'
    },
    {
      text: 'Notifications',
      icon: 'mdi-bell',
      url: '/account/profile/favourites'
    }
    // { text: 'My Cart', icon: 'mdi-cart', url: '/account/profile' },
  ]
});

export const mutations = {
  setUser(state, user) {
    state.user = user || null;
    state.isSignedIn = !!user;
  }
};

export const getters = {
  isSignedIn(state) {
    return state.isSignedIn;
  },
  loggedUser(state) {
    return state.user;
  }
};

export const actions = {
  checkAuth: ({ commit }, { req, $axios }) => {
    const token = getTokenFromCookie(req);

    if (token) {
      $axios.defaults.headers['x-access-token'] = token;

      return $axios
        .get('/api/user/profile')
        .then((res) => {
          commit('setUser', res.data.payload);
        })
        .catch((err) => {
          const { response, message } = err;
          console.log(message, response && response.data.message);

          commit('setUser', null);
        });
    }
  },
  logout: ({ commit }, { $axios, $router }) => {
    return $axios
      .post('/api/logout', { verbose: true })
      .then((res) => {
        commit('setUser', null);
        $router.go();
      })
      .catch((e) => {
        // eslint-disable-next-line no-unused-vars
        const { response, message } = e;
        commit(
          'snackbar/show',
          `${(response && response.data.payload) ||
            'Network Error. Try again later'}.`
        );
        commit('setUser', null);
        $router.go();
      });
  }
};
