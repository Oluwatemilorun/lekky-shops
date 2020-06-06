<template>
  <v-col cols="12">
    <v-row justify="center">
      <v-col cols="6" md="3">
        <v-select
          dense
          :items="brandList"
          v-model="brand"
          label="Select Brand"
        ></v-select>
      </v-col>
      <v-col cols="6" md="3">
        <v-select
          dense
          :items="categoryList"
          v-model="category"
          label="Select Category"
        ></v-select>
      </v-col>
      <v-col cols="6" md="3">
        <v-select
          dense
          :items="locationList"
          v-model="location"
          label="Select Location"
        ></v-select>
      </v-col>
      <v-col cols="6" md="3">
        <v-btn block dark color="error"> Search </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "search",

  data: () => ({
    locationList: ["Lagos", "Akure", "Abuja", " Port Harcourt", "Kano"],
    brandList: [
      "Emeka Limited",
      "Kunle Bespoke",
      "Zara Graphix",
      "YBNL Records"
    ],
    categoryList: [
      "Health",
      "Marketing",
      "Child Care",
      "Web Services",
      "Fashion"
    ]
  })
};
</script>

<style></style>
