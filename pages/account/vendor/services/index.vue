<template>
  <v-row>
    <v-col cols="12">
      <v-row no-gutters align="center" justify="center">
        <h3 class="headline mb-3">
          My Services
        </h3>
        <v-spacer />
        <v-btn
          color="accent"
          class="ma-0 white--text"
          @click="addServiceDialog = true"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          add a new service
        </v-btn>
      </v-row>
    </v-col>
    <v-col v-for="(service, index) in services" :key="index" cols="12">
      <ServiceVendorCard :service="service" />
    </v-col>
    <v-col v-if="services.length < 1" cols="12" class="pa-10">
      <h3 class="text-xs-center">
        No services added yet.
      </h3>
    </v-col>

    <v-dialog
      v-model="addServiceDialog"
      scrollable
      persistent
      max-width="350px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <div class="title">
            Add new service
          </div>
        </v-card-title>
        <v-card-text>
          <v-form v-model="addServiceForm">
            <v-row row wrap>
              <!-- <v-col cols="12">
								<v-card height="150px" color="grey lighten-3" flat style="position: relative">
									<div v-if="isUploading" class="progress-wrapper">
										<v-progress-circular indeterminate color="primary"></v-progress-circular>
									</div>
									<label for="cover-image">
										<v-tooltip bottom>
											<img slot="activator" :src="coverImage || `/img/upload.png`" width="100%" height="100%">
											<span>Click to upload cover photo</span>
										</v-tooltip>
										<input type="file" name="cover" id="cover-image" accept="image/*" hidden @change="previewCover($event)">
									</label>
								</v-card>
							</v-col> -->
              <v-col cols="12">
                <v-text-field
                  v-model="serviceName"
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
              <!-- <v-col cols="12">
								<v-textarea
									v-model="description"
									label="Description of service"
									outline
									hint="Briefly describe the service"
									counter
          							maxlength="250"
									rows="2"
									:rules="[
										v => !!v || 'Description of service is required',
										v => !!v && v.length <= 250 || 'Maximum character reached'
									]"
								></v-textarea>
							</v-col> -->
              <!-- <v-col xs4>
								<v-select
									v-model="currency"
									label="Currency"
									:items="currencies"
									item-text="currency"
									:hint="`${currency.currency}`"
									return-object
									persistent-hint
									:rules="[
										v => !!v || 'Currency is required'
									]"
								>
									<template v-slot:selection="{ item, index }">
										<v-icon>{{item.icon}}</v-icon>
									</template>
								</v-select>
							</v-col>
							<v-col xs8>
								<v-text-field
									v-model="amount"
									label="Cost of Service"
									hint="How much is this service?"
									:rules="[
										v => !!v || 'Cost of service is required'
									]"
								></v-text-field>
							</v-col> -->
            </v-row>
          </v-form>
        </v-card-text>
        <!-- <v-divider></v-divider> -->
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="addServiceDialog = false">
            cancel
          </v-btn>
          <v-btn
            :disabled="!addServiceForm"
            :loading="savingService"
            color="primary"
            @click="addService()"
          >
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ServiceVendorCard from '~/components/_vendor/ServiceVendorCard';

/* eslint-disable no-unused-vars, no-undef */
export default {
  components: { ServiceVendorCard },
  async asyncData({ $axios, query, redirect, error }) {
    try {
      const { data, status, statusText } = await $axios.get(
        '/api/vendor/services'
      );

      if (data.state === 'OK') {
        return {
          services: data.payload
        };
      } else {
        error({ statusCode: 400, message: data.payload });
      }
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    return {
      addServiceDialog: false,
      addServiceForm: false,
      savingService: false,
      coverImage: null,
      isUploading: false,
      currency: { currency: 'Nigerian Naira, NGN', icon: 'mdi-currency-ngn' },
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
      serviceName: null,
      name: null,
      description: null,
      amount: 0
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    previewCover(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImage = reader.result;
        const output = document.getElementById('category-cover-preview');
      };
      reader.readAsDataURL(e.target.files[0]);
      // this.uploadSuccess = false;
    },
    addService() {
      this.savingService = true;
      axios
        .post('/api/services/new', { name: this.serviceName })
        .then((res) => {
          this.$store.commit('snackbar/show', {
            text: 'Service added successfully.',
            icon: 'success'
          });
          this.$router.push(
            `/account/vendor/services/${res.data.payload.serviceId}`
          );
          this.savingService = false;
          this.addServiceDialog = false;
        })
        .catch((error) => {
          console.log(error);
          const { response, message } = error;

          this.isUploading = false;
          this.uploadSuccess = false;
          this.savingService = false;
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error'
          });
        });
    }
    // async saveService () {
    // 	this.isUploading = true;
    // 	this.savingService = true;
    // 	try {
    // 		let formData = new FormData();
    // 		let cover = document.getElementById('cover-image');
    // 		let name = cover.files[0].name;
    // 		formData.append("file", cover.files[0]);
    // 		formData.append("test_string", "this string shows");
    // 		formData.append("path", "vendor/");

    // 		await axios.post('https://bucket.rainbowhub.co/cp/upload.php', formData, {
    // 			headers: {
    // 				'Content-Type': 'multipart/form-data'
    // 			}
    // 		});

    // 		this.isUploading = false;
    // 		this.$store.commit('snackbar/show', 'Cover processed successfully.');

    // 		await axios.post('/api/vendor/services/add', {
    // 			name: this.name,
    // 			description: this.description,
    // 			cover: `https://bucket.rainbowhub.co/cp/vendor/${name}`,
    // 			currency: this.currency,
    // 			amount: this.amount,
    // 		});

    // 		this.$store.commit('snackbar/show', 'Service added successfully.');
    // 		this.savingService = false;
    // 		this.addServiceDialog = false;
    // 		this.$router.go();

    // 	} catch (error) {
    // 		console.log(error);

    // 		let { response, message } = error;

    // 		this.isUploading = false;
    // 		this.uploadSuccess = false;
    // 		this.savingService = false;
    // 		this.$store.commit('snackbar/show', response && response.statusText || message, 'error', true);
    // 	}
    // }
  }
};
</script>

<style>
.progress-wrapper {
  position: absolute;
  left: 46%;
  top: 45%;
}
</style>
