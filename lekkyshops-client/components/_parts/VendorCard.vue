<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 4 : 0"
      tile
      outlined
      class="card text-center"
      :width="cardWidth"
    >
      <v-img :src="vendor.cover" height="150" width="100%" />
      <v-avatar color="grey lighten-3" size="100" style="margin-top: -30px">
        <v-img :src="vendor.avatar" />
      </v-avatar>
      <v-card-text class="text-center pt-1">
        <div class="subtitle-1 font-weight-bold">
          {{ vendor.name }}
        </div>
        <v-rating
          :value="4.2"
          color="primary"
          background-color="primary"
          half-increments
          readonly
          dense
          size="16"
        />
        <div>
          {{ vendor.description }}
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row>
          <v-col cols="6">
            <v-btn outlined color="primary" to="/vendors/1"> view shop </v-btn>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn icon color="primary">
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
export default {
  props: {
    vendor: {
      type: Object,
      default: () => ({
        name: 'Rare Collections',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor`,
        avatar: '/img/clothing.jpg',
        cover: '/img/shopping.jpg',
      }),
    },
    cardWidth: {
      type: [Number, String],
      default: () => '100%',
    },
  },
}
</script>

<style></style>
