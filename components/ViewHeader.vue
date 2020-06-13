<template>
  <div class="mb-5">
    <h3 class="display-1 text-capitalize">
      {{ title }}
    </h3>
    <v-breadcrumbs
      divider="/"
      :items="$store.state.breadcrumbs"
      class="px-1 py-0"
    >
      <template v-slot:item="props">
        <a
          :href="props.item.url"
          class="breadcrumb-link caption text-capitalize"
          :class="[props.item.disabled && 'disabled']"
        >
          {{ props.item.text.replace(/-/g, ' ').toUpperCase() }}
        </a>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: ['title'],
  watch: {
    title(val) {
      this.$store.commit('admin/setPageTitle', val);
    }
  },
  mounted() {
    this.$store.commit('admin/setPageTitle', this.title);
  }
};
</script>

<style></style>
