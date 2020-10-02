<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold" v-text="'Categories'" />
      <v-spacer />
      <v-btn
        color="primary"
        class="text-capitalize"
        depressed
        @click.stop="dialog = !dialog"
      >
        Add
        <span class="hidden-sm-and-down">Category</span>
      </v-btn>
    </v-toolbar>

    <!-- Add New Category -->
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-card-title class="font-weight-bold">
          Add New Category
          <v-spacer />
          <v-btn icon @click.stop="dialog = !dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="addCategoryForm">
            <v-row>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="name"
                  label="Name"
                  outlined
                  :rules="[(v) => !!v || 'Name is required']"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="description"
                  label="Description"
                  outlined
                  rows="2"
                  :rules="[(v) => !!v || 'Description is required']"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-combobox
                  v-model="tags"
                  label="Tags"
                  outlined
                  multiple
                  small-chips
                  hint="Press *Enter or Tab to save"
                  :rules="[
                    (v) => v.length >= 1 || 'At least one tag is required',
                  ]"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-btn
                  color="primary"
                  block
                  large
                  depressed
                  class="text-capitalize"
                  :loading="loading"
                  :disabled="!addCategoryForm"
                  @click="addCategory()"
                >
                  Add Category
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      addCategoryForm: false,
      name: '',
      description: '',
      tags: [],
      loading: false,
    }
  },
  methods: {
    async addCategory() {
      this.loading = true
      const data = {
        name: this.name,
        description: this.description,
        tags: this.tags,
      }
      try {
        await console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
