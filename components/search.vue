<template>
  <v-col cols="12">
    <v-row justify="center">
      <v-col cols="6" md="3">
        <v-select
          v-model="brand"
          dense
          :items="brandList"
          label="Select Brand"
        />
      </v-col>
      <v-col cols="6" md="3">
        <v-select
          v-model="category"
          dense
          :items="categoryList"
          label="Select Category"
        />
      </v-col>
      <v-col cols="6" md="3">
        <v-select
          v-model="location"
          dense
          :items="locationList"
          label="Select Location"
        />
      </v-col>
      <v-col cols="6" md="3">
        <v-btn block dark color="error">
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'search',

  data: () => ({
    locationList: ['Lagos', 'Akure', 'Abuja', ' Port Harcourt', 'Kano'],
    brandList: [
      'Emeka Limited',
      'Kunle Bespoke',
      'Zara Graphix',
      'YBNL Records'
    ],
    categoryList: [
      'Health',
      'Marketing',
      'Child Care',
      'Web Services',
      'Fashion'
    ]
  })
};
</script>

<style></style>
