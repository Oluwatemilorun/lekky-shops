<template>
  <v-card outlined>
    <v-row class="px-3">
      <v-col cols="6">
        <div class="subtitle-1 ml-1 text-capitalize">{{ review.name }}</div>
        <v-rating
          color="primary"
          :value="review.rating"
          size="14"
          half-increments
          dense
          readonly
          class="ml-1"
          background-color="primary"
        />
      </v-col>
      <v-col cols="6" class="text-right">
        <v-avatar color="primary" size="50">
          <v-img v-if="review.avatar" :src="review.avatar" />
          <span
            v-else
            class="title white--text font-weight-bold text-uppercase"
          >
            {{ review.name.charAt(0) }}
          </span>
        </v-avatar>
      </v-col>
    </v-row>
    <v-card-text class="subtitle-1 pt-0">
      {{ review.text }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      default: () => ({
        name: 'jane doe',
        rating: 3.6,
        text: 'some awesome text',
      }),
    },
  },
}
</script>

<style></style>
