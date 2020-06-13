<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex shrink>
        <v-avatar
          size="220px"
          color="primary lighten-2"
          class="d-block mx-auto"
        >
          <img :src="avatar" alt />
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-layout fill-height align-end row wrap pa-3>
          <v-flex>
            <div class="display-1">
              {{ name }}
            </div>
            <div class="subheading">
              {{ email }}
            </div>
            <div>
              <v-chip v-if="isActive" dark label color="green darken-1">
                Active
              </v-chip>
              <v-chip v-else dark label color="red darken-2">
                Inactive
              </v-chip>
              <span class="pl-3">User actions</span>
              <v-menu offset-x>
                <v-btn slot="activator" icon>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
                <v-list dense>
                  <v-list-item v-if="isActive" @click="deactivate">
                    <v-list-item-title>Deactivate user</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="!isActive" @click="activate">
                    <v-list-item-title>Activate user</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deactivate">
                    <v-list-item-title>Delete user</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-vars, no-unused-expressions */
export default {
  layout: 'admin',
  async asyncData({ $axios, params, error }) {
    try {
      const { id } = params;
      const { data, status, statusText } = await $axios.get(
        `/api/admin/users/${id}`
      );
      console.log(data.payload);

      if (data.state === 'OK') {
        return {
          ...data.payload,
          id
        };
      } else {
        error({ statusCode: status, message: data.payload });
      }
    } catch (e) {
      const { response } = e;
      if (response)
        error({
          statusCode: response.status,
          message: response.statusText
        });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    return {};
  },
  methods: {
    deactivate() {
      confirm(`Are you sure you want to deactivate user [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Deactivating user...') +
          this.$axios
            .post(`/api/admin/users/${this.id}/deactivate`)
            .then((res) => {
              this.$store.commit('loadingDialog/hide', 'Deactivating user...');
              if (res.data.state === 'OK') {
                this.$store.commit(
                  'snackbar/show',
                  'user deactivated successfully',
                  true
                );
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', res.data.payload, true);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit('loadingDialog/hide', 'Deactivating user...');
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    },
    activate() {
      confirm(`Are you sure you want to activate user [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Activating user...') +
          this.$axios
            .post(`/api/admin/users/${this.id}/activate`)
            .then((res) => {
              this.$store.commit('loadingDialog/hide', 'Activating user...');
              if (res.data.state === 'OK') {
                this.$store.commit(
                  'snackbar/show',
                  'user activated successfully',
                  true
                );
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', res.data.payload, true);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit('loadingDialog/hide', 'Deactivating user...');
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    }
  }
};
</script>

<style></style>
