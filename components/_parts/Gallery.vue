<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :overlay="false"
    max-width="100vw"
    transition="dialog-transition"
  >
    <v-layout column>
      <v-btn fab fixed top left small icon color="white">
        <v-icon dark>
          mdi-close
        </v-icon>
      </v-btn>
      <v-flex>
        <v-layout row wrap fill-height justify-center>
          <v-carousel hide-delimiters height="80vh" class="">
            <v-carousel-item src="src" height="80vh" />
          </v-carousel>
        </v-layout>
      </v-flex>
      <v-flex shrink>
        <v-layout row wrap style="height: 120px">
          <v-tabs
            v-model="currentImage"
            centered
            color="transparent"
            fixed-tabs
            grow
            height="120px"
            hide-slider
            icons-and-text
            next-icon="mdi-arrow-right"
            prev-icon="mdi-arrow-left"
            right
            show-arrows
          >
            <v-tab class="transparent">
              <v-img />
            </v-tab>
          </v-tabs>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
export default {
  name: 'gallery',
  props: ['items'],
  data() {
    return {};
  }
};
</script>

<style></style>
