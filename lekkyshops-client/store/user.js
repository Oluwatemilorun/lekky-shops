export const state = () => ({
  user: null,
  isSignedIn: false,
  menu: [
    {
      text: 'Account',
      icon: 'mdi-account-outline',
      url: '/account/profile/me',
    },
    {
      text: 'Orders',
      icon: 'mdi-cube-outline',
      url: '/account/profile/orders',
    },
    {
      text: 'Favourites',
      icon: 'mdi-heart-outline',
      url: '/account/profile/favourites',
    },
    {
      text: 'Pending Reviews',
      icon: 'mdi-comment-edit-outline',
      url: '/account/profile/reviews',
    },
    {
      text: 'Notifications',
      icon: 'mdi-bell-outline',
      url: '/account/profile/notifications',
    },
    {
      text: 'Change Password',
      icon: 'mdi-bell-outline',
      url: '/account/profile/change-pasword',
    },
  ],
})

export const mutations = {
  setUser(state, user) {
    state.user = user || null
    state.isSignedIn = !!user
  },
}

export const getters = {
  isSignedIn(state) {
    return state.isSignedIn
  },
  loggedUser(state) {
    return state.user
  },
}
