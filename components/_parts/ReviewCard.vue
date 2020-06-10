<template>
  <v-row class="ma-2">
    <v-col cols="auto">
      <v-avatar size="52px" color="primary lighten-2" class="mb-3">
        <v-img src="">
          <template v-slot:placeholder>
            <v-container fluid fill-height>
              <v-row justify="center" align="center">
                <v-progress-circular indeterminate color="primary" />
              </v-row>
            </v-container>
          </template>
        </v-img>
      </v-avatar>
    </v-col>
    <v-col>
      <v-row align="center">
        <v-col>
          <div class="body-1 pl-1 text-truncate">
            Name
          </div>
          <div class="">
            <v-rating
              v-model="rating"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="16"
              readonly
            />
          </div>
        </v-col>
        <v-col cols="auto">
          <div class="caption">
            time
          </div>
        </v-col>
        <v-col cols="12">
          <v-sheet color="tertiary lighten-5" class="pa-3">
            <p class="body-2 ma-0">
              Quis in sunt nulla amet sunt consectetur deserunt ea enim
              consectetur. Aute dolore exercitation non laboris reprehenderit
              dolore adipisicing anim fugiat cillum sit ut. Ea officia excepteur
              minim minim veniam. Incididunt laboris veniam eiusmod elit cillum
              est pariatur voluptate est. Cillum veniam ullamco voluptate dolore
              aliquip culpa qui occaecat ex. Aliquip magna irure ea tempor do in
              voluptate.
            </p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'service-card',
  props: ['review'],
  data() {
    return {
      rating: 3
    };
  }
};
</script>

<style></style>
