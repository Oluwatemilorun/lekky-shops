<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap class="ma-0 mb-2">
          <label for="cover-image" class="d-block" style="width:100%">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-card height="250px" width="100%" flat v-on="on">
                  <v-img
                    v-if="cover"
                    :src="cover"
                    width="100%"
                    height="100%"
                    cover
                  />
                  <v-layout
                    v-else
                    column
                    wrap
                    fill-height
                    justify-center
                    align-center
                    class="primary--text"
                  >
                    <v-icon color="primary" size="50px">mdi-plus</v-icon>
                    Add cover picture
                  </v-layout>
                  <v-layout
                    v-if="coverUploading"
                    row
                    wrap
                    align-center
                    justify-center
                    class="image-loader--wrapper"
                  >
                    <v-progress-circular
                      v-if="!coverUploadError"
                      indeterminate
                      color="primary"
                    />
                    <v-btn
                      v-else
                      small
                      text
                      color="primary"
                      @click.stop="saveCover()"
                    >
                      retry
                    </v-btn>
                  </v-layout>
                </v-card>
              </template>
              <span>Click to upload gallery cover picture</span>
            </v-tooltip>
            <input
              id="cover-image"
              type="file"
              name="cover"
              accept="image/*"
              hidden
              @change="uploadCover($event)"
            />
          </label>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <div class="display-2 text-capitalize">
          {{ name }}
        </div>
        <div class="subheading">
          {{ description }}
        </div>
        <v-layout row wrap ma-0>
          <v-flex shrink>
            <div>Tags:</div>
          </v-flex>
          <v-flex>
            <v-chip v-for="(item, index) in tags" :key="index" small>
              {{ item }}
            </v-chip>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-btn
          small
          color="primary"
          class="mx-0"
          @click="editCategoryDialog = true"
        >
          edit category
        </v-btn>
        <v-btn small color="accent" class="mx-0" @click="deleteCategory">
          delete category
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex v-for="(sub, index) in subs" :key="index" xs12 md4>
            <v-card height="200px" hover>
              <v-img
                :src="sub.cover"
                width="100%"
                height="150px"
                cover
                class="primary lighten-2"
              />

              <v-card-text>
                {{ sub.name }}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card height="200px" hover @click="addCategoryDialog = true">
              <v-layout
                column
                wrap
                fill-height
                justify-center
                align-center
                ma-0
              >
                <v-icon size="100px" color="accent">
                  mdi-plus
                </v-icon>
                <div>Add sub category</div>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

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

    <v-dialog
      v-model="editCategoryDialog"
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
            <v-btn icon text @click="editCategoryDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-layout>
        </v-card-title>
        <v-form v-model="editCategoryForm">
          <v-layout row wrap ma-0 px-3 pb-3>
            <v-flex xs12>
              <v-text-field
                v-model="name"
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
                v-model="description"
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
                v-model="tags"
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
                :disabled="!editCategoryForm"
                color="accent"
                @click="editCategory()"
              >
                save edits
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-vars, no-undef, no-unused-expressions */
export default {
  layout: 'admin',
  async asyncData({ $axios, params }) {
    try {
      const { id } = params;
      const { data, status, statusText } = await $axios.get(
        `/api/categories/${id}`
      );

      return {
        id,
        ...data.payload
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
      coverUploading: false,
      coverUploadError: false,
      editCategoryDialog: false,
      editCategoryForm: false,
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
        .post(`/api/categories/${this.id}/sub`, {
          name: this.categoryName,
          description: this.categoryDescription,
          tags: this.categoryTags
        })
        .then((res) => {
          if (res.data.state === 'OK') {
            this.$router.go();
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
    },
    editCategory() {
      this.loading = true;
      this.$axios
        .put(`/api/categories/${this.id}/`, {
          name: this.name,
          description: this.description,
          tags: this.tags
        })
        .then((res) => {
          if (res.data.state === 'OK') {
            this.$router.go();
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
    },
    deleteCategory() {
      confirm(`Are you sure you want to delete this category [${this.id}]?`) &&
        this.$store.commit('loadingDialog/show', 'Deleting category...') +
          this.$axios
            .delete(`/api/admin/categories/${this.id}`)
            .then((res) => {
              this.$store.commit('loadingDialog/hide', 'Deleting category...');
              if (res.data.state === 'OK') {
                this.$store.commit('snackbar/show', {
                  text: 'category Deleted successfully',
                  icon: 'success'
                });
                this.$router.go();
              } else {
                this.$store.commit('snackbar/show', {
                  text: res.data.payload,
                  icon: 'error'
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.commit(
                'loadingDialog/hide',
                'Deactivating category...'
              );
              this.$store.commit('snackbar/show', {
                text: 'Network error',
                icon: 'error'
              });
            });
    },
    uploadCover(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.cover = reader.result;
        this.saveCover();
        // let output = document.getElementById('category-cover-preview');
      };
      reader.onabort = () => {};
      // reader.error = (err) => console.log(err);

      reader.readAsDataURL(e.target.files[0]);
    },
    saveCover() {
      this.coverUploading = true;
      this.coverUploadError = false;

      const formData = new FormData();
      const cover = document.getElementById('cover-image');
      const name = cover.files[0].name;
      formData.append('image', cover.files[0]);

      this.$axios
        .post(`/api/upload/category-cover/${this.id}`, formData)
        .then((res) => {
          this.coverUploading = false;
          this.coverUploadError = false;
          this.$store.commit('snackbar/show', {
            text: 'cover uploaded',
            icon: 'success'
          });
        })
        .catch((err) => {
          console.log(err);
          const { response, message } = err;
          // this.coverUploading = false;
          this.coverUploadError = true;
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error'
          });
        });
    }
  }
};
</script>

<style></style>
