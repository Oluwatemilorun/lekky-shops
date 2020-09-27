<template>
  <v-row justify="center" class="my-5">
    <v-col cols="10">
      <v-row justify="space-between">
        <v-col cols="3" class="hidden-md-and-down">
          <v-card outlined flat>
            <v-navigation-drawer
              floating
              permanent
              stateless
              width="100%"
              value="true"
            >
              <v-list dark class="py-0" color="primary">
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <v-avatar size="46" color="white">
                      <v-img v-if="user.avatar" :src="user.avatar" />
                      <span v-else class="primary--text title">
                        {{ user.name.charAt(0).toUpperCase() }}
                      </span>
                    </v-avatar>
                  </v-list-item-avatar>
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
              <v-list class="py-0">
                <v-list-item
                  v-for="(item, index) in userMenu"
                  :key="index"
                  nuxt
                  exact
                  :to="item.url"
                >
                  <v-list-item-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
                <v-list-item link class="accent">
                  <v-list-item-title>
                    <span class="white-text text-center"> Logout </span>
                  </v-list-item-title>
                </v-list-item>
                <v-divider />
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card outlined flat class="pa-5">
            <nuxt-child />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      userMenu: this.$store.state.user.menu,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
}
</script>

<style></style>
