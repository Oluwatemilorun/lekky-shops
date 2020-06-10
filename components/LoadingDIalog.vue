<template>
  <div>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $store.state.loadingDialog.text }}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  // name: 'loading-dialog',
  computed: {
    dialog() {
      return this.$store.state.loadingDialog.show;
    }
  }
};
</script>

<style></style>
