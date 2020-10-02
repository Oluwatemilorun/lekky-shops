<template>
  <div>
    <v-container fluid class="tertiary">
      <v-breadcrumbs :items="breadcrumbs" />
    </v-container>

    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-row class="d-non d-sm-fle">
            <v-col v-for="v in 12" :key="v" cols="12" sm="6" md="4" lg="3">
              <VendorCard />
            </v-col>
            <v-col cols="12">
              <div class="text-center">
                <v-pagination :value="2" :total-visible="5" :length="10" />
              </div>
            </v-col>
          </v-row>
          <!-- infinite scroll for mobile -->
          <!-- <v-row justify="center" class="hidden-sm-and-up">
            <v-col cols="11">
              <v-virtual-scroll
                :items="[...vendors]"
                :bench="1"
                height="1400"
                item-height="350"
              >
                <template v-slot="{ item }">
                  <div class="pb-3">
                    <VendorCard :v-model="item" />
                  </div>
                  <v-divider />
                </template>
              </v-virtual-scroll>
            </v-col>
          </v-row> -->
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
