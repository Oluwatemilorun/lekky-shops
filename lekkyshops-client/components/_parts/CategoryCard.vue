<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :flat="!hover"
      link
      :to="`/categories/${category.slug}`"
      color="grey lighten-3"
      height="225"
      class="category-card"
    >
      <v-img
        :src="category.cover ? category.cover : '/img/hair-dresser.jpeg'"
        height="100%"
      >
        <v-sheet
          tile
          height="100%"
          width="100%"
          :color="hover ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)'"
          class="category-overlay"
        >
          <v-row
            justify="center"
            align="center"
            class="fill-height text-center"
          >
            <v-col class="white--text text-capitalize">
              <v-chip color="white" outlined class="mb-1">
                <v-icon left> mdi-account-multiple </v-icon>
                19
              </v-chip>
              <div class="font-weight-bold title">
                {{ category.name }}
              </div>
            </v-col>
          </v-row>
        </v-sheet>
        <template v-slot:placeholder>
          <v-row justify="center" align="center" class="fill-height">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
.category-card {
  border-radius: 10px;
}
.category-card .category-overlay {
  transition: all ease-in-out 0.3s;
}
</style>
