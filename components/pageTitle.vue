<template>
  <v-parallax
    :src="bgintro"
    height="320"
    jumbotron
    class="text-center align-end"
  >
    <h2 class="display-2">
      <strong>{{ title }}</strong>
    </h2>
  </v-parallax>
</template>

<script>
import bgIntro from '~/assets/img/bg-intro.png';

export default {
  name: 'page-title',
  props: {
    title: String
  },
  data: () => ({
    bgintro: bgIntro
  })
};
</script>

<style></style>
