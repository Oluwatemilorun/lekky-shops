<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="(category, index) in categories" :key="index" xs12 md4>
        <v-card height="200px" hover :to="`/admin/categories/${category._id}`">
          <v-img
            :src="category.cover"
            width="100%"
            height="150px"
            cover
            class="primary lighten-2"
          />

          <v-card-text class="text-capitalize">
            {{ category.name }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-tooltip top>
      <template slot="activator">
        <v-btn
          fab
          fixed
          right
          bottom
          dark
          large
          color="primary"
          @click="addCategoryDialog = true"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <span>Add new category</span>
    </v-tooltip>

    <v-dialog
      v-model="addCategoryDialog"
      persistent
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card min-height="300px">
        <v-card-title>
          <v-layout row wrap fill-height align-center>
            <div class="title">
              Add Category
            </div>
            <v-spacer />
            <v-btn icon text @click="addCategoryDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-layout>
        </v-card-title>
        <v-form v-model="addCategoryForm">
          <v-layout row wrap ma-0 px-3 pb-3>
            <v-flex xs12>
              <v-text-field
                v-model="categoryName"
                label="Categroy title"
                outline
                counter="32"
                :rules="[
                  (v) => !!v || 'Please enter category name',
                  (v) =>
                    (!!v && v.length <= 32) ||
                    'Category title must be at most 32 characters'
                ]"
              />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="categoryDescription"
                label="Categroy description"
                outline
                counter="120"
                rows="2"
                :rules="[
                  (v) => !!v || 'Please enter category description',
                  (v) =>
                    (!!v && v.length <= 32) ||
                    'Category description must be at most 120 characters'
                ]"
              />
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="categoryTags"
                label="Categroy tags"
                outline
                multiple
                chips
                persistent-hint
                hint="Press *Enter* or *Tabs* key to tag"
                :rules="[
                  (v) =>
                    (!!v && v.length >= 1) || 'Please enter at lease one tag'
                ]"
              />
            </v-flex>
            <v-flex xs12>
              <v-btn
                block
                :loading="loading"
                :disabled="!addCategoryForm"
                color="accent"
                @click="addCategory()"
              >
                Add
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, res, error }) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data, status, statusText } = await $axios.get('/api/categories');

      return {
        categories: data.payload
      };
    } catch (e) {
      console.log(e);
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    return {
      addCategoryDialog: false,
      addCategoryForm: false,
      loading: false,
      categoryName: null,
      categoryDescription: null,
      categoryTags: []
    };
  },
  methods: {
    addCategory() {
      this.loading = true;
      this.$axios
        .post('/api/categories', {
          name: this.categoryName,
          description: this.categoryDescription,
          tags: this.categoryTags
        })
        .then((res) => {
          if (res.data.state === 'OK') {
            this.$router.push(`/admin/categories/${res.data.payload._id}`);
          } else {
            this.$store.commit('snackbar/show', {
              text: res.data.message ? res.data.message : res.data.payload,
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          console.log(err);
          const { response } = err;
          this.$store.commit('snackbar/show', {
            text: (response.data && response.data.message) || 'Network error',
            icon: 'error'
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
