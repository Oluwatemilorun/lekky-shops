<template>
  <v-app-bar app color="grey lighten-5">
    <v-app-bar-nav-icon @click.stop="$store.commit('admin/toggleSidenav')" />
    <v-slide-y-reverse-transition>
      <v-layout fill-height justify-center column wrap>
        <div class="title font-weight-bold text-capitalize">
          {{ $store.state.admin.title }}
        </div>
        <v-breadcrumbs
          divider="/"
          :items="$store.state.admin.breadcrumbs"
          class="px-1 py-0"
        >
          <template v-slot:item="props">
            <a
              :href="props.item.url"
              class="breadcrumb-link caption text-capitalize"
              :class="[props.item.disabled && 'disabled']"
            >
              {{ props.item.text.toUpperCase() }}
            </a>
          </template>
        </v-breadcrumbs>
      </v-layout>
    </v-slide-y-reverse-transition>
    <v-spacer />
    <!-- <v-card color="primary lighten-1" flat class="pa-1">
			<div>user - 34141412424</div>
			<div>Current </div>
		</v-card> -->
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>
