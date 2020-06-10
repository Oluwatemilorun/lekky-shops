<template>
  <v-row row wrap>
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12">
          <v-tabs v-model="serviceTab" color="transparent" light>
            <v-tab
              :to="`/account/vendor/services/${id}/about`"
              ripple
              active-class="primary white--text active-service-tabs"
              class="caption"
            >
              Service Information
            </v-tab>
            <v-tab
              :to="`/account/vendor/services/${id}/statistics`"
              ripple
              active-class="primary white--text active-service-tabs"
              class="caption"
            >
              Statistics
            </v-tab>
            <v-tab
              :to="`/account/vendor/services/${id}/reviews`"
              ripple
              active-class="primary white--text active-service-tabs"
              class="caption"
            >
              Ratings and reviews
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-container fluid py-0>
        <nuxt-child />
      </v-container>
    </v-col>
    <!-- <v-list-item avatar>
						<v-list-item-avatar>
							<v-icon color="amber lighten-1">mdi-alert-octagon</v-icon>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="text-capitalize">{{serviceName}}</v-list-item-title>
							<div class="caption grey--text text--darken-1">Pending Approval</div>
						</v-list-item-content>
					</v-list-item>
					<v-list-item avatar>
						<v-list-item-avatar>
							{{serviceProgress}}%
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="text-capitalize">
								<v-row row wrap>
									<v-progress-linear v-model="serviceProgress"></v-progress-linear>
								</v-row>
							</v-list-item-title>
							<div class="caption grey--text text--darken-1">Service creation progress</div>
						</v-list-item-content>
		</v-list-item>-->
  </v-row>
</template>

<script>
/* eslint-disable no-unused-vars */
import axios from '~/plugins/axios';

export default {
  async asyncData({ $axios, params, error, redirect, route }) {
    try {
      const { id } = params;

      if (route && route.fullPath === `/account/vendor/services/${id}`) {
        return redirect(`/account/vendor/services/${id}/about`);
      }

      const { data, status, statusText } = await $axios.get(
        `/api/vendor/services/${id}`
      );

      if (data.state === 'OK') {
        return {
          ...data.payload,
          id,
          serviceName: data.payload.name
        };
      } else {
        error({ statusCode: 400, message: data.payload });
      }
    } catch (e) {
      const { response } = e;
      if (response)
        error({
          statusCode: response.status,
          message: response.statusText
        });
      else error({ statusCode: 503, message: e.message });
    }
  },
  data() {
    return {
      serviceTab: 'serivce-information-tab'
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  mounted() {
    const alertMarkup = `
			<div tabindex="-1" role="listitem" class="v-list-item theme--light px-0">
				<div class="v-avatar v-list-item__avatar" style="height: 40px; min-width: 40px; width: 40px;">
					<i aria-hidden="true" class="v-icon mdi notranslate theme--light ${
            this.isApproved ? 'mdi-check-circle' : 'mdi-alert-octagon'
          }"></i>
				</div>
				<div class="v-list-item__content">
					<div class="v-list-item__title text-capitalize">${this.serviceName}</div>
					<div class="caption grey--text text--darken-1">${
            this.isApproved ? 'Approved' : 'Pending Approval'
          }</div>
				</div>
			</div>
		`;

    this.$store.commit('alerts/setVendorAlerts', alertMarkup);
  }
};
</script>

<style>
.v-tabs__item.active-service-tabs {
  border-radius: 10px 10px 0px 0px;
}
.tab-footer-fixed {
  position: fixed;
  bottom: 50px;
  width: 100%;
}
.image-loader--wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
}
</style>
