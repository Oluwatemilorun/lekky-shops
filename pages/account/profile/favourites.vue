<template>
  <v-layout row wrap>
    <v-flex grow>
      <h3 class="headline mb-3">
        Liked /Favourite Services
      </h3>
    </v-flex>
    <v-flex xs12 pa-0>
      <v-container grid-list-md fluid pa-0>
        <v-layout row wrap class="ma-0">
          <v-flex v-for="(service, index) in services" :key="index" xs6 md4 lg3>
            <ServiceCard :service="service" />
          </v-flex>
          <v-flex v-if="services.length == 0" xs12>
            <p class="text-xs-center pa-2 primary lighten-2">
              There are no liked services.
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex grow>
      <h3 class="headline mb-3">
        Liked /Favourite Vendors
      </h3>
    </v-flex>
    <v-flex xs12 pa-0>
      <v-flex v-if="vendors.length == 0" xs12>
        <p class="text-xs-center pa-2 primary lighten-2">
          There are no liked vendors.
        </p>
      </v-flex>
    </v-flex>
    <v-flex grow>
      <h3 class="headline mb-3">
        Liked /Favourite Products
      </h3>
    </v-flex>
    <v-flex xs12 pa-0>
      <v-flex v-if="products.length == 0" xs12>
        <p class="text-xs-center pa-2 primary lighten-2">
          There are no liked products.
        </p>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import ServiceCard from '~/components/_parts/ServiceCard';
// eslint-disable-next-line no-unused-vars
import axios from '~/plugins/axios';

export default {
  components: { ServiceCard },
  async asyncData({ $axios, error }) {
    try {
      const serviceData = await $axios.get('/api/user/favourites/service');

      return {
        services: serviceData.data.payload,
        vendors: [],
        products: []
      };
    } catch (e) {
      const { response } = e;
      if (response)
        error({
          statusCode: response.status,
          message: response.statusText
        });
      else error({ statusCode: 500, message: e.message });
    }
  }
};
</script>

<style></style>
