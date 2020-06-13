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
          <img :src="logo" alt />
        </v-avatar>
      </v-flex>

      <v-flex>
        <v-layout fill-height align-end row wrap pa-3>
          <v-flex>
            <div class="display-1">
              {{ businessName }}
            </div>
            <div class="subheading">
              <span class="font-weight-bold">Category:</span>
              {{ category }}
            </div>
            <div class="subheading">
              <span class="font-weight-bold">Sub-category:</span>
              {{ subCategory }}
            </div>
            <div>
              <v-chip v-if="isActive" small dark label color="green darken-1">
                Active
              </v-chip>
              <v-chip v-else small dark label color="red darken-2">
                Inactive
              </v-chip>

              <v-chip v-if="isApproved" small dark label color="green darken-1">
                Approved
              </v-chip>
              <v-chip v-else small dark label color="red darken-2">
                Pending approval
              </v-chip>

              <span class="pl-3">vendor actions</span>
              <v-menu offset-x>
                <v-btn slot="activator" icon>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
                <v-list dense>
                  <v-list-item v-if="isActive" @click="deactivate">
                    <v-list-item-title>Deactivate vendor</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="!isActive" @click="activate">
                    <v-list-item-title>Activate vendor</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="isApproved" @click="unapprove">
                    <v-list-item-title>Unpublish vendor</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="!isApproved" @click="approve">
                    <v-list-item-title>Publish vendor</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="remove">
                    <v-list-item-title>Delete vendor</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-card ref="about-business" class="mb-3">
          <v-card-title class="font-weight-medium">
            <v-icon left>
              mdi-office-building
            </v-icon>
            <v-layout column wrap ma-0>
              <div class="title mb-1">
                About business
              </div>
            </v-layout>
          </v-card-title>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-textarea v-model="shortDescription" outline rows="2" />
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="description" outline rows="3" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">
            <v-icon left>
              mdi-image-multiple
            </v-icon>
            <v-layout column wrap ma-0>
              <div class="title mb-1">
                Business graphic assets
              </div>
            </v-layout>
          </v-card-title>
          <v-layout row wrap px-3 pb-2>
            <v-flex xs12>
              <v-layout column wrap ma-0>
                <div class="subtitle mb-1">
                  Business logo
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap class="scroll-x ma-0">
                <v-card height="150px" width="150px" hover v-on="on">
                  <v-img
                    v-if="logoImage"
                    :src="logoImage"
                    height="100%"
                    cover
                  />
                </v-card>
              </v-layout>
            </v-flex>

            <v-flex xs12>
              <v-layout column wrap ma-0>
                <div class="subtitle mb-1">
                  Business Cover
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap class="scroll-x ma-0">
                <v-card height="170px" width="270px" hover v-on="on">
                  <v-img v-if="cover" :src="cover" height="100%" cover />
                </v-card>
              </v-layout>
            </v-flex>

            <v-flex xs12>
              <v-layout column wrap ma-0>
                <div class="subtitle">
                  Gallery
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout
                row
                wrap
                align-center
                class="scroll-x ma-0"
                style="overflow-y: hidden; overflow-x: scroll;"
              >
                <v-card
                  v-for="(item, index) in gallery"
                  :key="index"
                  height="120px"
                  width="120px"
                  class="mr-2 mb-2"
                >
                  <v-layout
                    row
                    wrap
                    ma-0
                    fill-height
                    style="position: relative"
                  >
                    <v-img :src="item.url" width="100%" height="100%" />
                  </v-layout>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex xs12 pt-0>
              <div class="caption primary--text text-xs-left">
                {{ gallery && gallery.length }}/8 Added
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card ref="contact-details" class="mb-3">
          <v-card-title primary-title>
            <div class="title">
              <v-icon left>
                mdi-email
              </v-icon>
              Contact Details
            </div>
          </v-card-title>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  :value="businessWebsite"
                  outline
                  label="Web URL"
                  readonly
                />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  :value="businessEmail"
                  outline
                  label="E-mail"
                  readonly
                />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  :value="businessPhone"
                  outline
                  label="Phone"
                  readonly
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card ref="address" class="mb-3">
          <v-card-title primary-title>
            <div class="title">
              <v-icon left>
                mdi-map-marker
              </v-icon>
              Address
            </div>
          </v-card-title>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-textarea
                  :value="businessAddress"
                  outline
                  rows="2"
                  label="Address"
                />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field :value="businessCity" outline label="City" />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field :value="businessState" outline label="State" />
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                  :value="businessCountry"
                  outline
                  label="Country"
                />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field :value="postalcode" outline label="Postal Code" />
              </v-flex>
              <v-flex xs12>
                <div class="font-weight-light title text-xs-center mb-4">
                  Map Preview
                </div>
                <v-layout
                  row
                  wrap
                  class="grey lighten-2"
                  style="height: 200px"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
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
        `/api/admin/vendors/${id}`
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
      confirm(`Are you sure you want to deactivate vendor [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Deactivating vendor...') +
          this.$axios
            .post(`/api/admin/vendors/${this.id}/deactivate`)
            .then((res) => {
              this.$store.commit(
                'loadingDialog/hide',
                'Deactivating vendor...'
              );
              if (res.data.state === 'OK') {
                this.$store.commit(
                  'snackbar/show',
                  'vendor deactivated successfully',
                  true
                );
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', res.data.payload, true);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit(
                'loadingDialog/hide',
                'Deactivating vendor...'
              );
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    },
    activate() {
      confirm(`Are you sure you want to activate vendor [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Activating vendor...') +
          this.$axios
            .post(`/api/admin/vendors/${this.id}/activate`)
            .then((res) => {
              this.$store.commit('loadingDialog/hide', 'Activating vendor...');
              if (res.data.state === 'OK') {
                this.$store.commit(
                  'snackbar/show',
                  'vendor activated successfully',
                  true
                );
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', res.data.payload, true);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit('loadingDialog/hide', 'activating vendor...');
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    },
    approve() {
      confirm(`Are you sure you want to publish vendor [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Publishing vendor...') +
          this.$axios
            .post(`/api/admin/vendors/${this.id}/approve`)
            .then((res) => {
              this.$store.commit('loadingDialog/hide', 'Publishing vendor...');
              if (res.data.state === 'OK') {
                this.$store.commit(
                  'snackbar/show',
                  'Vendor published successfully',
                  true
                );
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', res.data.payload, true);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit('loadingDialog/hide', 'Publishing vendor...');
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    },
    unapprove() {
      confirm(`Are you sure you want to unpublish vendor [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Unpublishing vendor...') +
          this.$axios
            .post(`/api/admin/vendors/${this.id}/disapprove`)
            .then((res) => {
              this.$store.commit(
                'loadingDialog/hide',
                'Unpublishing vendor...'
              );
              if (res.data.state === 'OK') {
                this.$store.commit(
                  'snackbar/show',
                  'Vendor published successfully',
                  true
                );
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', res.data.payload, true);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit(
                'loadingDialog/hide',
                'Unpublishing vendor...'
              );
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
