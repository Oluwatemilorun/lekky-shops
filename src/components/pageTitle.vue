<template>
  <v-parallax
    src="../assets/img/bg-intro.png"
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
export default {
  name: "pageTitle",
  props: {
    title: String
  }
};
</script>

<style></style>
