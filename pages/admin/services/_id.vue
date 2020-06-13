<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex shrink>
        <v-avatar
          size="220px"
          color="primary lighten-2"
          class="d-block mx-auto"
          tile
        >
          <img :src="cover" alt="" />
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-layout fill-height align-end row wrap pa-3>
          <v-flex>
            <div class="display-1">
              {{ name }}
            </div>
            <div class="subheading">
              <span class="font-weight-bold">Category: </span> {{ category }}
            </div>
            <div class="subheading">
              <span class="font-weight-bold">Sub-category: </span>
              {{ subCategory }}
            </div>
            <div>
              <!-- <v-chip v-if="isActive" dark label color="green darken-1">Active</v-chip>
							<v-chip v-else dark label color="red darken-2">Inactive</v-chip> -->

              <v-chip v-if="isApproved" small dark label color="green darken-1">
                Approved
              </v-chip>
              <v-chip v-else small dark label color="red darken-2">
                Pending approval
              </v-chip>

              <span class="pl-3">service actions</span>
              <v-menu offset-x>
                <v-btn slot="activator" icon>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
                <v-list dense="">
                  <!-- <v-list-item v-if="isActive" @click="deactivate">
										<v-list-item-title>Deactivate service</v-list-item-title>
									</v-list-item> -->
                  <!-- <v-list-item v-if="!isActive" @click="activate">
										<v-list-item-title>Activate service</v-list-item-title>
									</v-list-item> -->
                  <v-list-item v-if="isApproved" @click="unapprove">
                    <v-list-item-title>Unpublish service</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="!isApproved" @click="approve">
                    <v-list-item-title>Publish service</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="remove">
                    <v-list-item-title>Delete service</v-list-item-title>
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
/* eslint-disable no-unused-expressions, no-unused-vars */

export default {
  layout: 'admin',
  async asyncData({ $axios, params, error }) {
    try {
      const { id } = params;
      const { data, status, statusText } = await $axios.get(
        `/api/admin/services/${id}`
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
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    return {};
  },
  methods: {
    deactivate() {
      confirm(`Are you sure you want to deactivate service [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Deactivating service...') +
          this.$axios
            .post(`/api/admin/services/${this.id}/deactivate`)
            .then((res) => {
              this.$store.commit(
                'loadingDialog/hide',
                'Deactivating service...'
              );
              if (res.data.state === 'OK') {
                this.$store.commit('snackbar/show', {
                  text: 'service deactivated successfully',
                  icon: 'success'
                });
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', {
                  text: res.data.message,
                  icon: 'error'
                });
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
      confirm(`Are you sure you want to activate service [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Activating service...') +
          this.$axios
            .post(`/api/admin/services/${this.id}/activate`)
            .then((res) => {
              this.$store.commit('loadingDialog/hide', 'Activating service...');
              if (res.data.state === 'OK') {
                this.$store.commit('snackbar/show', {
                  text: 'service activated successfully',
                  icon: 'success'
                });
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', {
                  text: res.data.payload,
                  icon: 'error'
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit('loadingDialog/hide', 'activating service...');
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    },
    approve() {
      confirm(`Are you sure you want to publish service [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Publishing service...') +
          this.$axios
            .post(`/api/admin/services/${this.id}/approve`)
            .then((res) => {
              this.$store.commit('loadingDialog/hide', 'Publishing service...');
              if (res.data.state === 'OK') {
                this.$store.commit('snackbar/show', {
                  text: 'Service published successfully',
                  icon: 'success'
                });
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', {
                  text: res.data.message,
                  icon: 'error'
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit('loadingDialog/hide', 'Publishing service...');
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    },
    unapprove() {
      confirm(`Are you sure you want to unpublish service [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Unpublishing service...') +
          this.$axios
            .post(`/api/admin/services/${this.id}/disapprove`)
            .then((res) => {
              this.$store.commit(
                'loadingDialog/hide',
                'Unpublishing service...'
              );
              if (res.data.state === 'OK') {
                this.$store.commit('snackbar/show', {
                  text: 'Service published successfully',
                  icon: 'success'
                });
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', {
                  text: res.data.message,
                  icon: 'error'
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit('loadingDialog/hide', 'Unpublishing user...');
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
