<template>
  <div class="menubar">
    <v-app-bar height="40" color="white" flat class="hidden-sm-and-down">
      <v-tabs
        color="black"
        optional
        grow
        hide-slider
        class="text-center"
        :mobile-breakpoint="960"
      >
        <v-tab
          v-for="(category, y) in categories"
          :key="y"
          class="text-capitalize font-weight-thin pa-0 text--primary"
        >
          <v-menu
            bottom
            offset-y
            open-on-hover
            nudge-left="15"
            transition="slide-x-reverse-transition"
            :min-width="category.subs.length > 0 ? 850 : 650"
          >
            <template v-slot:activator="{ on }">
              <span class="subtitle-2 pa-3" v-on="on">
                {{ category.name }}
              </span>
            </template>
            <v-sheet
              tile
              color="white"
              class="px-5"
              :width="category.subs.length > 0 ? 850 : 650"
            >
              <v-row>
                <v-col cols="9">
                  <div class="title font-weight-medium text-capitalize">
                    {{ category.name }}
                  </div>
                </v-col>
                <v-col cols="3" class="text-right">
                  <v-btn
                    text
                    color="text--primary"
                    class="text-capitalize subtitle-1"
                    :to="`/categories/${category.slug}`"
                  >
                    View All
                    <v-icon right> mdi-chevron-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col v-show="category.subs.length > 0" cols="4" class="pt-0">
                  <v-list>
                    <v-list-item
                      v-for="(item, n) in category.subs"
                      :key="n"
                      link
                    >
                      <v-list-item-title class="subtitle-1 text-capitalize">
                        {{ item.name }}
                      </v-list-item-title>
                      <v-list-item-action>
                        <v-icon color="primary" small>
                          mdi-chevron-right
                        </v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col
                  :cols="category.subs.length > 0 ? 8 : 12"
                  class="pt-0 px-5"
                >
                  <v-row>
                    <v-col
                      v-for="v in [
                        'Croxz Motors',
                        'Kemi\'s Boutique',
                        'Rare Collections',
                        'Accessorize',
                      ]"
                      :key="v"
                      cols="6"
                      class="pa-1"
                    >
                      <v-hover v-slot:default="{ hover }">
                        <v-card
                          :flat="!hover"
                          link
                          color="grey lighten-3"
                          height="200"
                          class="vendor-card"
                        >
                          <v-img src="" height="100%">
                            <v-sheet
                              tile
                              height="100%"
                              width="100%"
                              :color="
                                hover ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)'
                              "
                              class="vendor-overlay"
                            >
                              <v-row
                                justify="center"
                                align="center"
                                class="fill-height text-center"
                              >
                                <v-col class="white--text text-capitalize">
                                  <v-chip color="white" outlined class="mb-1">
                                    <v-icon left> mdi-palette-swatch </v-icon>
                                    57
                                  </v-chip>
                                  <div class="font-weight-bold subtitle-1">
                                    {{ v }}
                                  </div>
                                </v-col>
                              </v-row>
                            </v-sheet>
                            <template v-slot:placeholder>
                              <v-row
                                justify="center"
                                align="center"
                                class="fill-height"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="primary"
                                />
                              </v-row>
                            </template>
                          </v-img>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </v-menu>
        </v-tab>
      </v-tabs>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Menubar',
  computed: {
    categories() {
      return this.$store.state.category.categories
    },
  },
}
</script>
<style scoped>
.menubar {
  margin-top: 60px;
}
.vendor-card .vendor-overlay {
  transition: all ease-in 0.3s;
}
</style>
