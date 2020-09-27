<template>
  <div>
    <v-sheet color="grey lighten-5">
      <v-row justify="center" align="center" class="fill-height">
        <div class="font-weight-bold display-1 my-7">All Vendors</div>
      </v-row>
    </v-sheet>
    <v-container fluid>
      <v-breadcrumbs :items="breadcrumbs" />
    </v-container>

    <v-container fluid class="pt-5 mx-lg-10">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row>
            <v-col v-for="v in 12" :key="v" cols="6" md="4" lg="3" class="mb-8">
              <VendorCard />
            </v-col>
          </v-row>
          <div class="text-center">
            <v-pagination :value="2" :total-visible="5" :length="10" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    breadcrumbs: [
      { text: 'Home', to: '/', disabled: false },
      { text: 'Vendors', to: '/vendors', disabled: true },
    ],
  }),
  head() {
    return {
      title: 'All Vendors',
    }
  },
}
</script>

<style></style>
