<template>
  <v-row>
    <v-form ref="form" v-model="addServiceForm">
      <v-row>
        <v-col cols="12">
          <v-card width="100%" class="mb-3">
            <v-row no-gutters class="pa-3">
              <v-col cols="12">
                <div class="title mb-1">
                  Service details
                </div>
                <!-- <div class="caption primary--text">Certificates should be in *.jpg or *.png format</div> -->
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="name"
                  v-model="name"
                  outlined
                  counter="25"
                  label="Name of service"
                  hint="The name of the service you render"
                  :rules="[
                    (v) => !!v || 'Name of service is required',
                    (v) =>
                      (!!v && v.length <= 25) ||
                      'Name of service length exceeded'
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  ref="shortDescription"
                  v-model="shortDescription"
                  outlined
                  counter="80"
                  label="Short description"
                  hint="Briefly summarize this service"
                  rows="2"
                  :rules="[
                    (v) => !!v || 'Short description is required',
                    (v) =>
                      (!!v && v.length <= 80) ||
                      'Short description should be at most 80 characters long'
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  ref="description"
                  v-model="description"
                  outlined
                  counter="4000"
                  label="Full description"
                  hint="Explain your service in detail"
                  rows="4"
                  :rules="[
                    (v) =>
                      (!!v && v.length <= 4000) ||
                      'Full description should be at most 4000 characters long'
                  ]"
                />
                <!-- v => !!v || 'Full description is required', -->
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card width="100%" class="mb-3">
            <v-row class="px-4">
              <v-col cols="12">
                <div class="title mb-1">
                  Service graphic assets
                </div>
                <div class="caption primary--text">
                  Manage your service gallery. All images should be in *.jpg or
                  *.png format.
                </div>
              </v-col>
              <v-col cols="12" class="pb-0">
                <div class="subtitle mb-1">
                  Cover photo
                </div>
                <div class="caption primary--text" />
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-row no-gutters class="scroll-x ma-0">
                  <label for="cover-image">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-card height="200px" width="200px" hover v-on="on">
                          <v-img
                            v-if="cover"
                            :src="cover"
                            height="100%"
                            cover
                          />
                          <v-container v-else fill-height class="primary--text">
                            <v-row
                              justify="center"
                              align="center"
                              class="flex-column"
                            >
                              <v-icon color="primary" size="50px">
                                mdi-plus
                              </v-icon>
                              <span class="caption d-block">
                                Add Cover Image
                              </span>
                            </v-row>
                          </v-container>
                          <v-container
                            v-if="coverUploading"
                            fill-height
                            class="image-loader--wrapper"
                          >
                            <v-row
                              justify="center"
                              align="center"
                              class="flex-column"
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
                            </v-row>
                          </v-container>
                        </v-card>
                      </template>
                      <span>Click to upload cover picture</span>
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
                </v-row>
              </v-col>
              <v-col cols="12" class="pb-0">
                <div class="subtitle">
                  Gallery
                </div>
                <div class="caption primary--text">
                  Other pictures that showcase your service.
                </div>
                <div class="caption primary--text">
                  Min of 2. Max of 8.
                </div>
              </v-col>
              <v-col cols="12">
                <v-row
                  no-gutters
                  align="center"
                  class="scroll-x pa-1"
                  style="overflow-y: hidden; overflow-x: scroll;"
                >
                  <v-card
                    v-for="(item, index) in gallery"
                    :key="index"
                    height="120px"
                    width="120px"
                    class="mr-2 mb-2"
                  >
                    <v-container fill-height fluid class="relative pa-0">
                      <v-img :src="item.url" width="100%" height="100%" />
                      <v-container
                        v-if="galleryUploading[item._id]"
                        fluid
                        fill-height
                        style="position: absolute; left: 0; right: 0; top: 0; bottom: 0"
                      >
                        <v-row
                          align="center"
                          justify="center"
                          class="image-loader--wrapper flex-column"
                        >
                          <v-progress-circular
                            v-if="!galleryUploadError[item._id]"
                            indeterminate
                            size="30"
                            color="primary"
                          />
                          <v-btn
                            v-else
                            small
                            text
                            color="primary"
                            @click.stop="saveImage(item.id)"
                          >
                            retry
                          </v-btn>
                        </v-row>
                      </v-container>
                      <v-btn
                        color="white"
                        icon
                        small
                        style="position: absolute; right: 0px; top: 0px"
                        @click="deleteImage(item.id)"
                      >
                        <v-icon color="black" small>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-container>
                  </v-card>

                  <div v-if="gallery && gallery.length < 8">
                    <label for="gallery-image">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-card
                            height="120px"
                            width="120px"
                            hover
                            class="mb-2"
                            v-on="on"
                          >
                            <v-container fluid fill-height>
                              <v-row
                                justify="center"
                                align="center"
                                class="primary--text flex-column"
                              >
                                <v-icon color="primary" size="40px">
                                  mdi-plus
                                </v-icon>
                                <span class="caption d-block">
                                  Add Image
                                </span>
                              </v-row>
                            </v-container>
                          </v-card>
                        </template>
                        <span>Click to upload image</span>
                      </v-tooltip>
                      <input
                        id="gallery-image"
                        type="file"
                        name="gallery"
                        accept="image/*"
                        hidden
                        @change="addToGallery($event)"
                      />
                    </label>
                  </div>
                </v-row>
              </v-col>
              <v-col cols="12" pt-0>
                <div class="caption primary--text text-xs-right">
                  {{ gallery && gallery.length }}/8 Added
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card width="100%" class="mb-3">
            <v-row class="px-4">
              <v-col cols="12">
                <div class="title mb-1">
                  Service pricing information
                </div>
                <div class="caption primary--text">
                  Give the pricing plan of your service..
                </div>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="amount"
                  v-model="amount"
                  label="Cost of Service"
                  outlined
                  hint="How much is this service?"
                  :rules="[]"
                />
                <!-- v => !!v || 'Cost of service is required' -->
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  ref="currency"
                  v-model="currency"
                  label="Currency"
                  outlined
                  :items="currencies"
                  item-text="currency"
                  hint="Currency to be used with service"
                  return-object
                  :rules="[]"
                >
                  <!-- v => !!v || 'Currency is required' -->
                  <template v-slot:selection="{ item }">
                    <v-row row wrap ma-0 align-center>
                      <v-icon left color="grey darken-3" size="20">
                        {{ item.icon }}
                      </v-icon>
                      <div>{{ item.currency }}</div>
                    </v-row>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  ref="unit"
                  v-model="unit"
                  label="Unit"
                  outlined
                  hint="The quantity the price is going for."
                  prefix="Per"
                  placeholder="E.g. day, hour, cut"
                  :rules="[(v) => !!v || 'Unit is required']"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card width="100%" class="mb-3">
            <v-row class="px-4">
              <v-col cols="12">
                <div class="title mb-1">
                  Appointment schedule
                </div>
                <div class="caption primary--text">
                  Pick the time this service is available
                </div>
              </v-col>
              <v-col cols="12">
                <v-row align="center">
                  <v-col>
                    <v-checkbox
                      v-model="scheduleCheck"
                      label="Monday"
                      value="monday"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="monday.from"
                      label="Starting hours"
                      @focus="
                        (time_dialog_activator = 'monday.from') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                  <v-col cols="auto">
                    <div class="font-weight-bold title text-xs-center">
                      -
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="monday.to"
                      label="Ending hours"
                      @focus="
                        (time_dialog_activator = 'monday.to') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                </v-row>
                <v-row row wrap align-center>
                  <v-col>
                    <v-checkbox
                      v-model="scheduleCheck"
                      label="Tuesday"
                      value="tuesday"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="tuesday.from"
                      label="Starting hours"
                      @focus="
                        (time_dialog_activator = 'tuesday.from') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                  <v-col cols="auto">
                    <div class="font-weight-bold title text-xs-center">
                      -
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="tuesday.to"
                      label="Ending hours"
                      @focus="
                        (time_dialog_activator = 'tuesday.to') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                </v-row>
                <v-row row wrap align-center>
                  <v-col>
                    <v-checkbox
                      v-model="scheduleCheck"
                      label="Wednesday"
                      value="wednesday"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="wednesday.from"
                      label="Starting hours"
                      @focus="
                        (time_dialog_activator = 'wednesday.from') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                  <v-col cols="auto">
                    <div class="font-weight-bold title text-xs-center">
                      -
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="wednesday.to"
                      label="Ending hours"
                      @focus="
                        (time_dialog_activator = 'wednesday.to') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                </v-row>
                <v-row row wrap align-center>
                  <v-col>
                    <v-checkbox
                      v-model="scheduleCheck"
                      label="Thursday"
                      value="thursday"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="thursday.from"
                      label="Starting hours"
                      @focus="
                        (time_dialog_activator = 'thursday.from') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                  <v-col cols="auto">
                    <div class="font-weight-bold title text-xs-center">
                      -
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="thursday.to"
                      label="Ending hours"
                      @focus="
                        (time_dialog_activator = 'thursday.to') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                </v-row>
                <v-row row wrap align-center>
                  <v-col>
                    <v-checkbox
                      v-model="scheduleCheck"
                      label="Friday"
                      value="friday"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="friday.from"
                      label="Starting hours"
                      @focus="
                        (time_dialog_activator = 'friday.from') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                  <v-col cols="auto">
                    <div class="font-weight-bold title text-xs-center">
                      -
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="friday.to"
                      label="Ending hours"
                      @focus="
                        (time_dialog_activator = 'monday.to') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                </v-row>
                <v-row row wrap align-center>
                  <v-col>
                    <v-checkbox
                      v-model="scheduleCheck"
                      label="Saturday"
                      value="saturday"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="saturday.from"
                      label="Starting hours"
                      @focus="
                        (time_dialog_activator = 'saturday.from') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                  <v-col cols="auto">
                    <div class="font-weight-bold title text-xs-center">
                      -
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="saturday.from"
                      label="Ending hours"
                      @focus="
                        (time_dialog_activator = 'saturday.to') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                </v-row>
                <v-row row wrap align-center>
                  <v-col>
                    <v-checkbox
                      v-model="scheduleCheck"
                      label="Sunday"
                      value="sunday"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="sunday.from"
                      label="Starting hours"
                      @focus="
                        (time_dialog_activator = 'sunday.from') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                  <v-col cols="auto">
                    <div class="font-weight-bold title text-xs-center">
                      -
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="sunday.to"
                      label="Ending hours"
                      @focus="
                        (time_dialog_activator = 'sunday.to') +
                          (time_dialog = true)
                      "
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-dialog
              ref="time_dialog"
              v-model="time_dialog"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <v-time-picker v-if="time_dialog" v-model="time" full-width>
                <v-spacer />
                <v-btn text color="primary" @click="time_dialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="saveHour() + $refs.time_dialog.save(time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-spacer />
            <v-btn
              color="primary"
              :disabled="!addServiceForm"
              :loading="saving"
              large
              class="ma-0"
              @click="saveUpdates()"
            >
              save changes
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-row>
</template>

<script>
/* eslint-disable vue/no-unused-vars, no-undef, no-unused-vars */

export default {
  async asyncData({ $axios, params, error }) {
    try {
      const { id } = params;
      const { data, status, statusText } = await $axios.get(
        `/api/vendor/services/${id}`
      );

      if (data.state === 'OK') {
        return {
          ...data.payload,
          id,
          serviceName: data.payload.name
        };
      } else {
        error({ statusCode: 400, message: data.payload });
      }
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 503, message: e.message });
    }
  },
  data() {
    return {
      addServiceForm: false,
      savingService: false,
      coverImage: null,
      isUploading: false,
      currencies: [
        {
          currency: 'Nigerian Naira, NGN',
          cur: 'ngn',
          icon: 'mdi-currency-ngn'
        },
        {
          currency: 'United States Dollars, USD',
          cur: 'usd',
          icon: 'mdi-currency-usd'
        },
        { currency: 'Euro, EUR', cur: 'eur', icon: 'mdi-currency-eur' },
        {
          currency: 'British Pounds, GBP',
          cur: 'gbp',
          icon: 'mdi-currency-gbp'
        },
        { currency: 'Chinese Yen, CNY', cur: 'cny', icon: 'mdi-currency-cny' }
      ],
      unit: null,
      units: ['day', 'hour'],
      coverUploading: false,
      coverUploadError: false,
      //
      gallery: [],
      cover: null,
      name: null,
      description: null,
      shortDescription: null,
      amount: 0,
      currency: { currency: 'Nigerian Naira, NGN', icon: 'mdi-currency-ngn' },
      schedule: [],
      appointmentSchedule: [],
      monday: { from: null, to: null },
      tuesday: { from: null, to: null },
      wednesday: { from: null, to: null },
      thursday: { from: null, to: null },
      friday: { from: null, to: null },
      saturday: { from: null, to: null },
      sunday: { from: null, to: null },
      time_dialog: false,
      time_dialog_activator: '',
      time: null,
      saving: false,
      fieldError: false,
      galleryUploading: {},
      galleryUploadError: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    serviceProgress() {
      let progress = 10;
      Object.keys(this.form).forEach((f) => {
        if (this.form[f]) {
          progress += 10;
        }
      });

      return progress;
    },
    scheduleCheck: {
      get() {
        return this.appointmentSchedule.map((a, b) => a.day);
      },
      set(newVal) {
        console.log(newVal);

        this.appointmentSchedule = [];
        newVal.forEach((val) => {
          this.appointmentSchedule.push({
            day: val,
            from: this[val].from,
            to: this[val].to
          });
        });

        if (newVal.length >= 1) {
          this[newVal[newVal.length - 1]].from = '9:00';
          this[newVal[newVal.length - 1]].to = '18:00';
        }
      }
    },
    form() {
      return {
        name: this.name,
        description: this.description,
        shortDescription: this.shortDescription,
        amount: this.amount,
        currency: this.currency,
        unit: this.unit,
        cover: this.cover,
        gallery: this.gallery.length >= 1 ? this.gallery : null,
        appointmentSchedule:
          this.appointmentSchedule.length >= 1 ? this.appointmentSchedule : null
      };
    }
  },
  methods: {
    saveHour() {
      const props = this.time_dialog_activator.split('.');
      this[props[0]][props[1]] = this.time;
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

      axios
        .post(`/api/upload/service-cover/${this.id}`, formData)
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
    },
    addToGallery(e) {
      const reader = new FileReader();
      reader.onload = () => {
        const _id = new Date().getTime().toString();
        const output = document.getElementById('gallery-image').files[0];

        this.gallery = [
          ...this.gallery,
          { _id, url: reader.result, file: output }
        ];
        this.saveImage(_id);
      };
      reader.onabort = () => {};

      reader.readAsDataURL(e.target.files[0]);
    },
    saveImage(id) {
      this.galleryUploading[id] = true;
      this.galleryUploadError[id] = false;

      const imageData = this.gallery.filter((a) => a._id === id)[0];
      const formData = new FormData();
      formData.append('image', imageData.file);

      axios
        .post(`/api/upload/service-gallery/${this.id}`, formData)
        .then((res) => {
          if (res.data.state === 'OK') {
            this.galleryUploading[id] = false;
            this.galleryUploadError[id] = false;
            this.$store.commit('snackbar/show', {
              text: 'image added to gallery successfully.',
              icon: 'success'
            });
          } else {
            this.galleryUploading[id] = false;
            this.galleryUploadError[id] = true;
            this.$store.commit('snackbar/show', {
              text: res.data.message,
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          console.log(err);
          const { response, message } = err;
          this.galleryUploadError[id] = true;
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error'
          });
        });
    },
    async fieldProgress() {
      let progress = 0;
      await Object.keys(this.form).forEach((f) => {
        if (this.form[f]) {
          progress += 10;
        }
      });

      return progress;
    },
    async saveUpdates() {
      try {
        this.saving = true;
        const data = {
          name: this.name,
          description: this.description,
          shortDescription: this.shortDescription,
          // cover: this.cover,
          amount: parseInt(
            this.amount
              .toString()
              .replace(',')
              .trim()
          ),
          currency: this.currency,
          unit: this.unit,
          appointmentSchedule: this.appointmentSchedule
        };

        const updateRes = await axios.put(`/api/services/new/${this.id}`, data);

        this.$store.commit('snackbar/show', {
          text: 'Service updated successfully.',
          icon: 'success'
        });
        this.saving = false;
        this.$router.go();
      } catch (err) {
        console.log(err);
        const { response, message } = err;
        // this.coverUploading = false;
        this.saving = true;
        this.$store.commit('snackbar/show', {
          text: (response && response.statusText) || message,
          icon: 'error'
        });
      }
    }
  }
};
</script>

<style></style>
