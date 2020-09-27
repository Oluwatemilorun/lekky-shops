<template>
  <div>
    <!-- Search bar  toolbar -->
    <v-app-bar
      id="search-bar"
      v-model="searchBar"
      absolute
      color="white"
      height="70"
      flat
    >
      <v-btn icon class="mr-6 mr-md-12" @click="toggleSearch">
        <v-icon color="primary"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-text-field
        placeholder="Search products, vendors and categories..."
        solo
        flat
        clearable
      />
    </v-app-bar>

    <!-- main toolbar -->
    <v-app-bar
      v-model="appBar"
      app
      absolute
      height="70"
      flat
      light
      color="white"
    >
      <v-btn icon color="primary" @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="px-0 mx-0">
        <v-btn
          to="/"
          text
          color="#f9f8f3"
          style="text-transform: none"
          class="font-weight-bold pl-0"
        >
          <span class="primary--text logo" style="font-size: 26px">
            LekkyShops
          </span>
        </v-btn>
      </v-toolbar-title>

      <v-btn
        v-for="(link, l) in links"
        :key="l"
        text
        class="hidden-sm-and-down subtitle-2"
        :to="link.href"
        exact
      >
        {{ link.text }}
      </v-btn>

      <v-spacer />

      <v-btn icon class="mx-1" @click="toggleSearch">
        <v-icon color="primary"> mdi-magnify </v-icon>
      </v-btn>

      <v-badge
        :content="cartCount"
        offset-y="18"
        offset-x="20"
        overlap
        bordered
      >
        <v-btn icon @click="toggleCart">
          <v-icon color="primary"> mdi-cart </v-icon>
        </v-btn>
      </v-badge>

      <UserMenu v-if="isLoggedIn" />

      <div v-else>
        <v-btn
          text
          color="secondary"
          depressed
          class="hidden-sm-and-down mx-3 error--text text-capitalize"
          :to="`/account/login?redirect=${$router.history.current.fullPath}`"
        >
          Login
        </v-btn>

        <v-btn
          color="accent"
          depressed
          class="hidden-sm-and-down text-capitalize"
          :to="`/account/register?redirect=${$router.history.current.fullPath}`"
        >
          Sign Up
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      color="white"
      temporary
      left
      floating
      width="320"
    >
      <v-list>
        <v-subheader class="text-uppercase mt-3"> All Categories </v-subheader>

        <v-list-item
          v-for="(item, i) in categories"
          :key="i"
          :to="`/categories/${item.slug}`"
          style="border-bottom: 1px solid #ccc"
        >
          {{ item.text }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Shopping Cart Drawer-->
    <v-navigation-drawer
      v-model="cartDrawer"
      app
      light
      temporary
      right
      width="400"
      hide-overlay
      floating
    >
      <CartItems />
    </v-navigation-drawer>

    <!-- Menubar -->
    <Menubar />
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    cartDrawer: null,
    searchBar: false,
    appBar: true,
  }),
  computed: {
    links() {
      return this.$store.state.links
    },
    categories() {
      return this.$store.state.category.categories
    },
    isLoggedIn() {
      return this.$store.state.user.isSignedIn
    },
    cartCount() {
      return this.$store.getters['product/cartCount']
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    toggleCart() {
      this.cartDrawer = !this.cartDrawer
    },
    toggleSearch() {
      this.searchBar = !this.searchBar
      this.appBar = !this.appBar
    },
  },
}
</script>

<style>
#search-bar .v-text-field__details {
  display: none;
}
#search-bar .v-input__slot {
  margin-bottom: 0px;
}
</style>
