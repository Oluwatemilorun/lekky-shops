<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-card
          width="90px"
          height="90px"
          tile
          flat
          hover
          color="primary lighten-2"
          class="my-2 catg-card"
          ripple
          v-on="on"
          @click.stop="select()"
        >
          >
          <v-img :src="item.cover">
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary" />
              </v-layout>
            </template>
          </v-img>
          <v-dialog-transition>
            <div v-if="isSelected" class="catg-card-overlay">
              <v-layout row wrap fill-height justify-center align-center>
                <v-icon color="white">
                  mdi-check-circle
                </v-icon>
              </v-layout>
            </div>
          </v-dialog-transition>
        </v-card>
      </template>
      <span class="text-capitalize">
        {{ item.name }}
      </span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      isSelected: false
    };
  },
  watch: {
    isSelected(a, b) {
      if (a) this.$emit('add', this.item.name, 'add');
      else this.$emit('remove', this.item.name, 'remove');
    }
  },
  methods: {
    select() {
      if (this.isSelected) {
        this.isSelected = false;
      } else {
        this.isSelected = true;
      }
      this.$emit('input', this.item);
    }
  }
};
</script>

<style></style>
