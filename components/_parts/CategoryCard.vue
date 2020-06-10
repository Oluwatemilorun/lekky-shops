<template>
  <v-card
    class="category-card"
    hover
    :to="`/category/${category.name.replace(' ', '-')}`"
    height="250px"
  >
    <v-img :src="category && category.cover" height="100%">
      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
        <v-progress-circular indeterminate color="primary" />
      </v-layout>
      <v-layout
        fill-height
        justify-center
        align-center
        column
        wrap
        pa-3
        ma-0
        class="v-img-overlay"
      >
        <v-chip color="white" outlined class="px-2 mx-auto font-weight-medium">
          <v-icon color="white" small class="mx-1">
            mdi-account-multiple
          </v-icon>
          01
        </v-chip>
        <h3
          class="text-capitalize title font-weight-bold white--text text-center d-block"
        >
          {{ category && category.name }}
        </h3>
      </v-layout>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: ['category'],
  data() {
    return {};
  }
};
</script>

<style scoped>
.category-card {
  border-radius: 10px;
}
.v-img-overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
