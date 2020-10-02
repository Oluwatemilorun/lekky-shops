export const state = () => ({
  links: [
    {
      icon: 'mdi-apps',
      title: 'Dashboard',
      to: '/',
    },
    {
      icon: 'mdi-tag-multiple',
      title: 'Categories',
      to: '/categories',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Vendors',
      to: '/vendors',
    },
    {
      icon: 'mdi-bus',
      title: 'Orders',
      to: '/orders',
    },
    {
      icon: 'mdi-account-multiple',
      title: 'Users',
      to: '/users',
    },
  ],
})
