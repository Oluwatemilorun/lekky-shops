<template>
  <div>
    <v-layout row wrap class="primary lighten-2" pa-3 align-center>
      <v-breadcrumbs divider="/" :items="breadcrumbs" class="pa-0">
        <template v-slot:item="props">
          <!-- <v-btn text small class="ma-0 pa-0" color="black" :to="props.item.path" style="min-width: 10px" :disabled="props.item.disabled">{{ props.item.text.toUpperCase() }}</v-btn> -->
          <a
            :href="props.item.path"
            class="breadcrumb-link"
            :class="[props.item.disabled && 'disabled']"
          >
            {{ props.item.text.toUpperCase() }}
          </a>
        </template>
      </v-breadcrumbs>
      <v-spacer />
      <v-btn-toggle
        v-model="toggle_view"
        mandatory
        class="transparent elevation-0"
      >
        <v-btn text>
          <v-icon>mdi-view-module</v-icon>
        </v-btn>
        <v-btn text>
          <v-icon>mdi-view-agenda</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-flex xs12>
        <h1>Categories</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex v-for="(category, index) in categories" :key="index" xs6 md4>
            <CategoryCard :category="category" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import CategoryCard from '~/components/_parts/CategoryCard.vue';

export default {
  components: { CategoryCard },
  async asyncData({ $axios, params, error }) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data, status, statusText } = await $axios(`/api/categories`, {
        method: 'get',
        withCredentials: true
      });

      return {
        categories: data.payload
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
  },
  data() {
    return {
      toggle_view: 0,
      breadcrumbs: [
        { text: 'home', path: '/' },
        { text: 'categories', path: '/category', disabled: true }
      ]
    };
  }
};
</script>

<style scoped></style>
