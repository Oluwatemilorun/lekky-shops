<template>
  <v-row class="pa-0">
    <v-col cols="12" class="pa-0 relative">
      <v-sheet tile>
        <v-carousel
          :show-arrows="false"
          hide-delimiters
          height="300px"
          class="elevation-0"
          cycle
          interval="4500"
        >
          <v-carousel-item
            v-for="(item, index) in carouselItems"
            :key="index"
            class="grey lighten-3"
          >
            <v-img :src="item.img" height="100%">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="primary" />
                </v-layout>
              </template>
              <v-container fill-height>
                <v-row>
                  <v-col cols="12" md="8" class="px-10">
                    <h3 class="display-2 font-weight-bold white--text">
                      {{ item.tagline }}
                    </h3>
                    <p class="headline white--text font-weight-bold">
                      {{ item.smallTagline }}
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-col>
    <v-col cols="12" class="pa-0 relative white" style="z-index: 1">
      <v-container style="margin-top: -70px">
        <v-row>
          <v-col cols="12" class="px-10">
            <v-sheet color="white">
              <v-row class="pa-0 ma-0">
                <v-col cols="12" class="px-0 mb-9">
                  <v-row
                    justify="center"
                    align="center"
                    class="ma-0 pb-2 elevation-2"
                  >
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        id="filter-catg"
                        v-model="filter_catg"
                        :items="categories"
                        placeholder="Category"
                        hide-details
                        flat
                        class="mx-1 my-0"
                        item-text="name"
                      />
                      <!-- @change="$router.push(`/category/${subCategory.replace(/ /g, '-')}`)" -->
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        id="filter-sub-categories"
                        v-model="filter_subCatg"
                        :items="subCatg"
                        placeholder="Sub Category"
                        hide-details
                        flat
                        class="mx-1 my-0"
                        item-text="name"
                      />
                      <!-- @change="$router.push(`/category/${subCategory.replace(/ /g, '-')}`)" -->
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        id="filter-location"
                        v-model="country"
                        :items="loadCountries()"
                        placeholder="Location"
                        hide-details
                        flat
                        class="mx-1 my-0"
                      />
                    </v-col>
                    <v-col cols="auto" sm="6" md="auto">
                      <v-btn
                        color="primary"
                        depressed
                        width="150px"
                        @click="searchFilter()"
                      >
                        search
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row justify="center">
                    <v-col cols="12">
                      <h3
                        class="display-1 text-center primary--text font-weight-medium"
                      >
                        Explore the Marketplace
                      </h3>
                    </v-col>
                    <v-col cols="10">
                      <v-row>
                        <v-col
                          v-for="(category, index) in categories"
                          :key="index"
                          cols="6"
                          sm="4"
                          md="3"
                        >
                          <CategoryCard :category="category" />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-row justify="center" class="my-12">
          <v-col cols="12">
            <h3 class="display-1 text-center primary--text font-weight-medium">
              How it Works
            </h3>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="12" sm="4">
                <v-row justify="space-around">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/1.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="title text-center primary--text font-weight-medium"
                    >
                      Describe Your Task
                    </h5>
                    <p class="body-2 font-weight-light text-center">
                      Non officia aute ea sit proident reprehenderit nostrud
                      irure mollit incididunt ipsum laborum consectetur.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4">
                <v-row justify="space-around">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/2.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="title text-center primary--text font-weight-medium"
                    >
                      Describe Your Task
                    </h5>
                    <p class="body-2 font-weight-light text-center">
                      Ut eiusmod velit cupidatat consectetur Lorem ex aute ea.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4">
                <v-row justify="space-around">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/3.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="title text-center primary--text font-weight-medium"
                    >
                      Describe Your Task
                    </h5>
                    <p class="body-2 font-weight-light text-center">
                      Mollit ex in nostrud aute culpa eiusmod est nostrud aliqua
                      voluptate aliqua laborum.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row justify="center">
              <v-btn color="primary" large>
                get started
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12" class="white">
      <v-container>
        <v-row class="my-12" justify="center">
          <v-col cols="12">
            <h3 class="display-1 text-center primary--text font-weight-medium">
              Why Use LekkyShops
            </h3>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="6" md="4">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/4.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="body-1 text-center primary--text font-weight-medium text-capitalize"
                    >
                      Saves your time
                    </h5>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" md="4">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/5.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="body-1 text-center primary--text font-weight-medium text-capitalize"
                    >
                      Safety first
                    </h5>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" md="4">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/6.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="body-1 text-center primary--text font-weight-medium text-capitalize"
                    >
                      Only the best quality
                    </h5>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" md="4">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/7.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="body-1 text-center primary--text font-weight-medium text-capitalize"
                    >
                      Easy to get help
                    </h5>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" md="4">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/9.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="body-1 text-center primary--text font-weight-medium text-capitalize"
                    >
                      Seamless communication
                    </h5>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" md="4">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-img
                      src="/img/icons/10.png"
                      height="100px"
                      width="100px"
                      class="ma-1"
                    />
                  </v-col>
                  <v-col cols="12" class="px-10">
                    <h5
                      class="body-1 text-center primary--text font-weight-medium text-capitalize"
                    >
                      Cash-Free payment
                    </h5>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12" class="white">
      <v-container>
        <v-row class="my-12" justify="center">
          <v-col cols="12">
            <h3 class="display-1 text-center primary--text font-weight-medium">
              What Our Vendors Are Saying
            </h3>
          </v-col>
          <v-col cols="12" md="10">
            <v-row justify="center">
              <v-col cols="12" sm="10">
                <v-carousel
                  cycle
                  hide-delimiter-background
                  delimeter-icon="mdi-minus"
                  interval="4000"
                  height="320"
                >
                  <v-carousel-item
                    v-for="(vendor, i) in vendors"
                    :key="i"
                    transition="scroll-x-transition"
                    reverse-transition="scroll-x-reverse-transition"
                  >
                    <v-sheet height="360" dark color="teal lighten-2" tile>
                      <v-row>
                        <v-col cols="6" color="primary" sm="5" lg="4">
                          <v-img
                            :src="vendor.img"
                            height="360"
                            style="margin-top: -12px"
                          />
                        </v-col>
                        <v-col cols="6" sm="7" lg="8" class="pa-sm-10">
                          <figure>
                            <blockquote class="blockquote subtitle-1">
                              <span class="display-1">&ldquo;</span>
                              {{ vendor.quote }}
                              <span class="display-1">&rdquo;</span>
                            </blockquote>
                            <fig-caption class=" pl-5 headline">
                              - {{ vendor.name }}
                            </fig-caption>
                          </figure>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <!-- <v-flex xs12>
			<v-layout tag="section">
				<v-container grid-list-md>
					<v-layout row wrap>
						<v-flex xs12 md6>
							<v-layout row wrap>
								<v-layout
									row
									justify-center
									align-center
									wrap
									class="app-screen-image"
									style="height: 700px; 290px;"
									:style="{ 'background-image': `url(${phoneMockup})` }"
								>
									<v-carousel
										:show-arrows="false"
										hide-delimiters
										height="445px"
										class="elevation-0"
										style="width: 250px"
									>
										<v-carousel-item v-for="(item, index) in appScreenItems" :key="index">
											<v-layout align-center justify-center row wrap tag="figure">
												<v-img :src="item.src" height="100%" contain>
													<v-layout slot="placeholder" fill-height align-center justify-center ma-0>
														<v-progress-circular indeterminate color="accent"></v-progress-circular>
													</v-layout>
												</v-img>
											</v-layout>
										</v-carousel-item>
									</v-carousel>
								</v-layout>
							</v-layout>
						</v-flex>
						<v-flex xs12 md6>
							<v-layout fill-height justify-center column pa-5>
								<h3 class="display-2 font-weight-bold primary--text mt-5 text-capitalize">
									Lekkyshops app
									<br />now available on
								</h3>
								<p
									class="title font-weight-light mt-2"
								>Est et consectetur consectetur aute veniam laboris Lorem non fugiat labore dolore.</p>
								<div class="d-block mt-3">
									<v-layout row wrap>
										<v-flex xs12 sm6 m12 lg6>
											<a class="d-block mt-2" href>
												<img :src="getAppPlay" alt="Android | Play store" width="200px" height="66px" />
											</a>
										</v-flex>
										<v-flex xs12 sm6 m12 lg6>
											<a class="d-block mt-2" href>
												<img :src="getAppIos" alt="iOS | App store" width="200px" height="66px" />
											</a>
										</v-flex>
									</v-layout>
								</div>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-container>
			</v-layout>
		</v-flex> -->
</template>

<script>
import vendor1 from '~/static/img/categories/barbers.jpg';
import vendor2 from '~/static/img/categories/event.jpg';

import { loadCountries } from '~/assets/js/main';
import CategoryCard from '~/components/_parts/CategoryCard.vue';

import phoneMockup from '~/assets/img/phone-mockup.png';
import getAppIos from '~/assets/img/get-app-ios.png';
import getAppPlay from '~/assets/img/get-app-play.png';

export default {
  components: {
    CategoryCard
  },
  // async asyncData({ $axios, req, store, error }) {
  //   try {
  //     let res = {};

  //     // res = await $axios.get(`/api/services?trending=t`);
  //     // if (store.state.user.isSignedIn) {
  //     // 	res = await this.$axios.get(`/api/services/interest`);
  //     // }
  //     // else {
  //     // 	res = await this.$axios.get(`/api/services/trending`);
  //     // }

  //     // eslint-disable-next-line no-unused-vars
  //     const { data, status, statusText } = res;

  //     return {
  //       trendingServices: data.payload
  //     };
  //   } catch (e) {
  //     console.log(e);

  //     const { response, message } = e;
  //     error({
  //       statusCode: (response && response.status) || 503,
  //       message: (response && response.statusText) || message
  //     });
  //   }
  // },
  data() {
    return {
      trendingServices: [],
      phoneMockup,
      getAppIos,
      getAppPlay,
      carouselItems: [
        {
          tagline: 'Do More For Less',
          smallTagline: 'Discover professionals near you',
          img: '/img/slides/01.jpg'
        },
        {
          tagline: 'A Big tagline',
          smallTagline: 'A Small Tagline',
          img: '/img/slides/03.jpg'
        }
      ],
      vendors: [
        {
          name: 'David Michael',
          img: vendor1,
          quote: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                  Est blanditiis dolorem culpa incidunt minus dignissimos deserunt
                  repellat aperiam quasi sunt.`
        },
        {
          name: 'Janet Jackson',
          img: vendor2,
          quote: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                  Est blanditiis dolorem culpa incidunt minus dignissimos deserunt
                  repellat aperiam quasi sunt officia expedita.`
        }
      ],
      appScreenItems: [
        { src: '/img/screens/00.jpg', caption: 'som' },
        { src: '/img/screens/01.jpg', caption: 'som' },
        { src: '/img/screens/02.jpg', caption: 'som' },
        { src: '/img/screens/03.jpg', caption: 'som' },
        { src: '/img/screens/04.jpg', caption: 'som' },
        { src: '/img/screens/05.jpg', caption: 'som' }
      ],
      filter_catg: '',
      filter_subCatg: null,
      country: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    isSignedIn() {
      return this.$store.state.user.isSignedIn;
    },
    categories() {
      return this.$store.state.category.categories || [];
    },
    subCatg() {
      const catg = this.categories.filter(
        (catg) => catg.name.toLowerCase() === this.filter_catg.toLowerCase()
      );
      return catg.length >= 1 ? catg[0].subs : [];
    }
  },
  methods: {
    loadCountries,
    searchFilter() {
      let url = '';
      if (this.filter_subCatg)
        url = `/category/${this.filter_subCatg.replace(/ /g, '-')}${
          this.country ? '?country=' + this.country : ''
        }`;
      else if (this.filter_catg)
        url = `/category/${this.filter_catg.replace(/ /g, '-')}${
          this.country ? '?country=' + this.country : ''
        }`;
      else if (this.country) url = `/category/all?country=${this.country}`;
      else
        return this.$store.commit('snackbar/show', {
          text: 'Select a category or country to search',
          icon: 'warning'
        });

      this.$router.push(url);
    }
  },
  head() {
    return {
      title: 'Home'
    };
  }
};
</script>

<style>
.feature-body {
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}
.feature-vid-overlay {
  background-position: right center;
  background-repeat: no-repeat;
}
.feature-vid-overlay::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(38, 50, 56, 0.65);
  z-index: -1;
}
.app-screen-image {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.slide-control--wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
}
</style>
