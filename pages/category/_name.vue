<template>
  <v-row class="relative">
    <v-col cols="12" class="pa-0 relative">
      <v-img
        :src="cover && cover.length > 1 ? cover : '/static/img/slides/03.jpg'"
        height="350px"
        class="tertiary lighten-5"
      />
      <v-fade-transition>
        <v-sheet
          v-if="toggle_map"
          height="350px"
          width="100%"
          color="tertiary"
          style="position: absolute; top: 0; left: 0; right: 0;"
        >
          <v-container fill-height>
            <v-row
              justify="center"
              align="center"
              class="title font-weight-light primary--text text--lighten-1"
            >
              Loading map...
            </v-row>
          </v-container>
        </v-sheet>
      </v-fade-transition>
    </v-col>
    <v-col cols="12" class="pa-0 relative white" style="z-index: 1">
      <v-container style="margin-top: -170px">
        <v-row>
          <v-col cols="12" class="px-10">
            <v-row no-gutters align="center">
              <h1 class="display-1 text-capitalize font-weight-bold mr-2">
                {{ name }}
              </h1>
              <v-btn
                outlined
                small
                color="primary"
                @click="toggle_map = !toggle_map"
              >
                Toggle map
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" class="px-10 pt-0">
            <v-breadcrumbs divider="/" :items="breadcrumbs" class="pa-0">
              <template v-slot:item="props">
                <v-chip
                  :color="props.item.disabled ? 'primary lighten-2' : ''"
                  text-color="black"
                  small
                  :disabled="props.item.disabled"
                  class="caption"
                  @click="$router.push(`${props.item.path}`)"
                >
                  {{ props.item.text.replace(/-/g, ' ').toUpperCase() }}
                </v-chip>
              </template>
            </v-breadcrumbs>
          </v-col>
          <v-col cols="12" class="px-10">
            <v-sheet color="white">
              <v-row class="pa-0 ma-0">
                <v-col cols="12" class="px-0 mb-9">
                  <v-row justify="center" align="center" class="ma-0">
                    <v-col cols="12" md="3">
                      <v-select
                        id="filter-sub-categories"
                        v-model="filter_subCatg"
                        :items="subCatg"
                        placeholder="Sub Category"
                        hide-details
                        flat
                        class="mx-1 my-0"
                        item-text="name"
                      />
                      <!-- @change="$router.push(`/category/${subCategory.replace(/ /g, '-')}`)" -->
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-autocomplete
                        id="filter-location"
                        v-model="filter_location"
                        :items="loadCountries()"
                        placeholder="Location"
                        hide-details
                        flat
                        class="mx-1 my-0"
                      />
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        id="filter-max-price"
                        v-model="filter_priceRange"
                        placeholder="Price range"
                        hide-details
                        flat
                        class="mx-1 my-0"
                      />
                    </v-col>
                    <!-- <v-col cols="12" md="2">
											<v-text-field
												placeholder="Min price"
												hide-details flat
												class="mx-1 my-0"
												id="filter-min-price"
											></v-text-field>
										</v-col> -->
                    <v-col cols="auto">
                      <v-btn
                        color="primary"
                        depressed
                        width="150px"
                        @click="searchFilter()"
                      >
                        search
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="px-lg-8">
                  <v-row>
                    <v-col v-if="services && services.length == 0" xs12>
                      <div class="pa-5 text-xs-center d-block">
                        No services available yet.
                      </div>
                    </v-col>
                    <v-col
                      v-for="(service, index) in services"
                      :key="index"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                      <ServiceCard :service="service" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- <v-flex xs3>
						<v-layout row wrap pa-4>
							<v-list dense expand class="transparent" style="">
								<v-list-group :value="true">
									<template v-slot:activator>
										<v-list-item>
											<v-list-item-content>
												<v-list-item-title class="font-weight-bold body-1">Browse Categories</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</template>

									<v-list-item
										v-for="item in subs"
										:key="item"
										:to="`/category/${item.name.replace(/ /g, '-')}`"
									>
										<v-list-item-content>
											<v-list-item-title class="text-capitalize">{{ item.name }}</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-group>

								<v-list-group :value="true" class="mt-3">
									<template v-slot:activator>
										<v-list-item>
											<v-list-item-content>
												<v-list-item-title class="font-weight-bold body-1">Countries</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</template>
								</v-list-group>
							</v-list>
						</v-layout>
					</v-flex> -->
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import ServiceCard from '~/components/_parts/ServiceCard';
import { loadCountries } from '~/assets/js/main';

export default {
  components: { ServiceCard },
  async asyncData({ $axios, params, query, error }) {
    try {
      const category = params.name.replace(/ /g, '-');
      const url =
        query && query.country
          ? `/api/services?category=${category}&country=${query.country}`
          : `/api/services?category=${category}`;

      // eslint-disable-next-line no-unused-vars
      const { data, status, statusText } = await $axios.get(url);

      return {
        services: data.payload.services,
        name: data.payload.name,
        cover: data.payload.cover,
        subs: data.payload.subs,
        breadcrumbs: [
          { text: 'home', path: '/' },
          { text: 'categories', path: '/category' },
          { text: category, path: `/category/${params.name}`, disabled: true }
        ]
      };
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    return {
      isRow: false,
      toggle_view: 0,
      toggle_sort: 0,
      toggle_map: false,
      filter_location: null,
      filter_subCatg: null,
      filter_priceRange: null
    };
  },
  computed: {
    subCatg() {
      return this.$store.state.category.categories.filter(
        (catg) => catg.name.toLowerCase() === this.name.toLowerCase()
      )[0].subs;
    }
  },
  methods: {
    loadCountries
  },
  head() {
    const name = this.name
      .split(' ')
      .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
      .join(' ');
    return {
      title: `${name} Categories`,
      description: 'Browse categories on LekkyShops.'
    };
  }
};
</script>

<style>
.v-img-overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>
