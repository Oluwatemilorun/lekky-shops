<template>
  <v-layout fill-height row wrap>
    <v-flex xs8>
      <v-flex xs12>
        <div class="title pt-2 text-capitalize">
          {{ category && category.name }}
        </div>
      </v-flex>
      <v-flex xs12>
        <v-layout v-if="category" row wrap mt-2 mx-0>
          <v-flex v-for="(item, index) in category.subs" :key="index" shrink>
            <v-btn
              small
              text
              color="black"
              class="font-weight-light"
              :to="`/category/${item.name.replace(/ /g, '-')}`"
            >
              {{ item.name }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-flex>
    <v-flex xs4>
      <v-img
        :src="category && category.cover"
        cover
        class="primary lighten-2"
        height="100%"
        width="100%"
      >
        <v-layout
          slot="placeholder"
          fill-height
          align-center
          justify-center
          ma-0
        >
          <v-progress-circular indeterminate color="primary" />
        </v-layout>
      </v-img>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['category']
};
</script>

<style></style>
