<template>
  <div>
    <v-sheet flat tile height="175" color="primary lighten-2">
      <v-img src="" height="100%" class="cover">
        <v-row
          justify="center"
          align="end"
          class="fill-height white--text overlay"
        >
          <v-col cols="11">
            <div class="headline font-weight-bold text-capitalize">
              All Categories
            </div>
            <v-breadcrumbs :items="breadcrumbs" dark class="px-0 py-2">
              <template v-slot:item="{ item }">
                <v-chip
                  class="text-capitalize"
                  :to="item.to"
                  :disabled="item.disabled"
                  depressed
                >
                  {{ item.text }}
                </v-chip>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-img>
    </v-sheet>

    <v-container class="my-5">
      <v-row justify="center">
        <v-col
          v-for="(category, x) in categories"
          :key="x"
          cols="12"
          sm="6"
          md="4"
        >
          <CategoryCard :category="category" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Popular Vendors -->
    <v-container class="my-5">
      <v-row justify="center">
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col cols="6" class="py-0">
                  <div class="headline font-weight-bold">Popular Vendors</div>
                </v-col>
                <v-col cols="6" class="text-right py-0">
                  <v-btn outlined to="/vendors">
                    View all
                    <v-icon size="16" right> mdi-arrow-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-slide-group>
                <v-slide-item v-for="p in 12" :key="p" class="my-3 mx-5">
                  <VendorCard :card-width="300" />
                </v-slide-item>
              </v-slide-group>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'home', to: '/' },
        { text: 'categories', to: '/categories', disabled: true },
      ],
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.categories
    },
  },
  head() {
    return {
      title: 'All Categories',
    }
  },
}
</script>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
