<template>
  <div>
    <v-app-bar
      app
      :absolute="!isMobile"
      height="60"
      flat
      color="white"
      :hide-on-scroll="isMobile"
    >
      <v-btn
        icon
        color="primary"
        height="40"
        width="40"
        class="hidden-md-and-up"
        @click.stop="mobDrawer = true"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title
        class="font-weight-bold px-0 ml-2"
        style="cursor: pointer"
        @click="$router.push('/')"
      >
        <v-icon large color="primary">mdi-shopping</v-icon>
        <span class="d-none d-sm-inline">LekkyShops</span>
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        v-for="(link, l) in links"
        :key="l"
        text
        small
        class="hidden-sm-and-down mx-1"
        :to="link.href"
        exact
      >
        {{ link.text }}
      </v-btn>

      <v-spacer />

      <v-btn
        icon
        class="mx-1"
        height="40"
        width="40"
        @click.stop="search = true"
      >
        <v-icon color="black"> mdi-magnify </v-icon>
      </v-btn>

      <v-badge
        :content="1"
        :value="1"
        offset-y="18"
        offset-x="20"
        overlap
        color="accent"
      >
        <v-btn icon height="40" width="40" @click.stop="wishlist = true">
          <v-icon color="black"> mdi-heart-outline </v-icon>
        </v-btn>
      </v-badge>

      <v-badge
        :content="cartCount"
        :value="cartCount"
        offset-y="18"
        offset-x="20"
        overlap
        bordered
        color="accent"
      >
        <v-btn icon height="40" width="40" @click.stop="cartDrawer = true">
          <v-icon color="black"> mdi-cart </v-icon>
        </v-btn>
      </v-badge>

      <UserMenu v-if="isLoggedIn" />
      <v-btn
        v-else
        icon
        color="black"
        height="40"
        width="40"
        :to="`/account/login?redirect=${$router.history.current.fullPath}`"
      >
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Drawers -->
    <MobileDrawer v-model="mobDrawer" />
    <CartItems v-model="cartDrawer" />
    <WishList v-model="wishlist" />

    <!-- Search dialog -->
    <SearchDialog v-model="search" />

    <!-- Menubar -->
    <Menubar />
  </div>
</template>

<script>
export default {
  data: () => ({
    mobDrawer: false,
    cartDrawer: false,
    search: false,
    wishlist: false,
  }),
  computed: {
    links() {
      return this.$store.state.links
    },
    isLoggedIn() {
      return this.$store.state.user.isSignedIn
    },
    cartCount() {
      return this.$store.getters['product/cartCount']
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
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
