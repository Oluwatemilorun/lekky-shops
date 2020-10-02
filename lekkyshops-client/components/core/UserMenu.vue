<template>
  <v-menu offset-y min-width="250">
    <template v-slot:activator="{ on }">
      <v-btn icon class="ml-5 mr-2" width="48" height="48" v-on="on">
        <v-avatar size="46" color="primary">
          <v-img v-if="user.avatar" :src="user.avatar" />
          <span v-else class="white--text title">
            {{ user.name.charAt(0).toUpperCase() }}
          </span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card color="white">
      <v-list dark class="py-0">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1 text-capitalize">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list light color="grey lighten-4" class="pa-0">
        <v-list-item two-line to="/account/vendor/about">
          <v-list-item-content>
            <v-list-item-title class="subtitle-1 mb-1">
              {{ user.businessName || 'Vendor' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Switch to Vendor Account
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon large color="primary"> mdi-chevron-right </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list class="pa-0">
        <v-list-item
          v-for="(item, index) in userMenu"
          :key="index"
          :to="`${item.url}`"
        >
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="primary lighten-3" link>
          <v-list-item-avatar>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user
    },
    userMenu() {
      return this.$store.state.user.menu
    },
  },
}
</script>

<style></style>
