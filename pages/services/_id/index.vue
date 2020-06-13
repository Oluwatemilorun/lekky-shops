<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs divider="/" :items="breadcrumbs" class="pa-0">
          <template v-slot:item="props">
            <v-chip
              :color="props.item.disabled ? 'primary lighten-2' : ''"
              text-color="black"
              small
              :disabled="props.item.disabled"
              class="caption"
              @click="$router.push(`${props.item.path}`)"
            >
              {{ props.item.text.replace(/-/g, ' ').toUpperCase() }}
            </v-chip>
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="3">
        <v-row>
          <v-col cols="12">
            <v-img
              :src="cover"
              width="100%"
              height="300px"
              cover
              class="primary lighten-2"
            >
              <template v-slot:placeholder>
                <v-container fill-height fluid>
                  <v-row justify="center" align="center">
                    <v-progress-circular indeterminate color="primary" />
                  </v-row>
                </v-container>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row align="start">
              <v-col v-for="image in gallery" :key="image._id" cols="auto">
                <v-card
                  width="72px"
                  height="72px"
                  flat
                  color="primary lighten-2"
                >
                  <v-img
                    :src="image.url"
                    width="100%"
                    height="100%"
                    cover
                    class="primary lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-container fill-height fluid>
                        <v-row justify="center" align="center">
                          <v-progress-circular indeterminate color="primary" />
                        </v-row>
                      </v-container>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-divider />
          </v-col>
          <v-col cols="12" class="hidden-md-and-down">
            <v-card
              width="100%"
              height="200px"
              flat
              color="primary lighten-2"
              class
            >
              <v-row no-gutters justify="center" align="center">
                <p class="text-cols-center display-1 font-weight-light">
                  Map
                </p>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row row wrap>
          <v-col cols="12">
            <v-chip
              color="accent"
              label
              small
              dark
              class="text-capitalize caption"
              @click.stop="
                $router.push(`/category/${subCategory.replace(/ /g, '-')}`)
              "
            >
              {{ subCategory }}
            </v-chip>
            <h5 class="display-1 mt-2">
              {{ name }}
            </h5>
            <p class="my-0">
              {{ shortDescription }}
            </p>
          </v-col>
          <v-col cols="12">
            <div class="mb-1">
              <v-icon small>
                mdi-map-marker
              </v-icon>
              {{ vendor && vendor.businessAddress }},
              {{ vendor && vendor.businessCountry }}
            </div>
            <v-row no-gutters align="center" class="mb-3">
              <v-rating
                v-model="rating"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
                readonly
              />
              <span class="grey--text text--darken-2 caption mx-1">{{
                rating || 'No reviews yet'
              }}</span>
              <span class="grey--text text--lighten-1 caption mr-2">
                ({{ reviews && reviews.length }})
              </span>
            </v-row>
            <v-divider />
          </v-col>
          <v-col cols="12">
            <p class="headline font-weight-bold">
              <v-icon size="22" class="pb-1">
                {{ currency && currency.icon }}
              </v-icon>
              {{ amount }}
            </p>
            <v-divider />
          </v-col>
          <v-col cols="12">
            <v-row no-gutters align="center" class="mb-3">
              <v-btn
                color="accent"
                class="ma-0"
                :to="`${id}/request`"
                @click="requestService"
              >
                request this service
              </v-btn>
              <v-spacer />
              <v-btn
                text
                :loading="adding"
                class="ma-0"
                @click.stop="addToFavourite"
              >
                <v-icon v-if="isFavourite" color="tertiary">
                  mdi-heart
                </v-icon>
                <v-icon v-else>
                  mdi-heart-outline
                </v-icon>
                {{ isFavourite ? 'favourite' : 'add to favourite' }}
              </v-btn>
              <v-col cols="12" md="auto" class="mb-xs-2" />
              <v-col cols="12" md="auto" class="mb-xs-2" />
            </v-row>
            <v-divider />
          </v-col>
          <v-col cols="12">
            <v-tabs
              v-model="mainTab"
              color="transparent"
              slider-color="primary"
            >
              <v-tab active-class="primary--text" href="#tab-description">
                Description
              </v-tab>
              <v-tab active-class="primary--text" href="#tab-availabilty">
                Availability
              </v-tab>
              <v-tab active-class="primary--text" href="#tab-reviews">
                Reviews
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12">
            <v-tabs-items v-model="mainTab">
              <v-tab-item value="tab-description">
                <p class="body-2 ma-0 pa-3">
                  {{ description }}
                </p>
              </v-tab-item>
              <v-tab-item value="tab-availabilty">
                <v-row>
                  <v-col cols="12">
                    <h5 class="pa-2">
                      This service is available on
                    </h5>
                  </v-col>
                  <v-col cols="12" />
                </v-row>
              </v-tab-item>
              <v-tab-item value="tab-reviews">
                <v-row>
                  <v-col cols="12">
                    <ReviewCard />
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3">
        <v-row justify="center" tag="section">
          <v-col cols="12">
            <h3 class="title text-center font-weight-light">
              Offered By:
            </h3>
          </v-col>
          <v-avatar size="120px" color="primary lighten-2" class="mb-3">
            <v-img :src="(vendor && vendor.cover) || ''">
              <template v-slot:placeholder>
                <v-container fluid fill-height>
                  <v-row justify="center" align="center">
                    <v-progress-circular indeterminate color="primary" />
                  </v-row>
                </v-container>
              </template>
            </v-img>
          </v-avatar>
          <v-col cols="12">
            <h5 class="title font-weight-bold text-center">
              {{ (vendor && vendor.businessName) || '' }}
            </h5>
            <div class="text-center">
              <v-icon small>
                mdi-map-marker
              </v-icon>
              {{ vendor && vendor.businessCountry }}
            </div>
          </v-col>
          <v-col cols="12" my-2>
            <div
              v-if="vendor && vendor.businessRating"
              class="row px- align-center"
            >
              <v-rating
                v-model="vendor.businessRating"
                color="yellow accent-4"
                dense
                half-increments
                hover
                readonly
                size="13"
              />
              <span class="grey--text text--darken-2 caption mx-1">{{
                vendor && vendor.businessRating
              }}</span>
              <span class="grey--text text--lighten-1 caption mr-2">
                ({{
                  vendor &&
                    vendor.businessReviews &&
                    vendor.businessReviews.length
                }})
              </span>
            </div>
            <div v-else class="caption text-center">
              No reviews yet
            </div>
          </v-col>
          <v-col cols="12" class="px-5">
            <p class="text-xs-justify body-2">
              {{ (vendor && vendor.shortDescription) || '' }}
            </p>
          </v-col>
          <v-col cols="12">
            <v-row justify="center">
              <v-btn
                color="accent"
                text
                class="ma-0"
                :to="`/v/${vendor && vendor.username}`"
              >
                visit page
              </v-btn>
              <!-- <v-btn color="error">add to favourites</v-btn> -->
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReviewCard from '~/components/_parts/ReviewCard';

export default {
  components: { ReviewCard },
  async asyncData({ $axios, params, query, error, store }) {
    try {
      const { id } = params;
      const { data, status, statusText } = await $axios.get(
        `/api/services/${id}`
      );

      if (data.state === 'NO') {
        return error({ statusCode: status, message: statusText });
      }

      const userLike = !!(
        store.state.user.isSignedIn &&
        data.payload.likedBy.filter(
          (a) => a.user === store.state.user.user.userId
        ).length > 0
      );

      return {
        id,
        ...data.payload,
        isFavourite: userLike,
        breadcrumbs: [
          { text: 'home', path: '/' },
          {
            text: data.payload.category,
            path: `/category/${data.payload.category.replace(/ /g, '-')}`
          },
          { text: data.payload.name, disabled: true }
        ]
      };
    } catch (e) {
      const { response } = e;
      if (response)
        error({
          statusCode: response.status,
          message: response.statusText
        });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    return {
      mainTab: 'tab-description',
      adding: false
    };
  },
  methods: {
    async addToFavourite() {
      if (!this.$store.state.user.isSignedIn)
        return this.$store.commit('snackbar/show', `You need to be signed in.`);

      this.adding = true;
      try {
        if (this.isFavourite) {
          // service already a favourite
          // eslint-disable-next-line no-unused-vars, no-undef
          const { data, status } = await axios.post(
            '/api/user/favourites/service/remove',
            {
              service: this.service._id
            }
          );

          this.adding = false;
          this.isFavourite = false;
          this.$store.commit(
            'snackbar/show',
            `Service removed from favourites successfully.`
          );
          this.$router.go();
        } else {
          // service is not yet a favourite
          // eslint-disable-next-line no-unused-vars, no-undef
          const { data, status } = await axios.post(
            '/api/user/favourites/service/add',
            {
              service: this.service._id
            }
          );

          this.adding = false;
          this.isFavourite = true;
          this.$store.commit(
            'snackbar/show',
            `Service added to favourites successfully.`
          );
        }
      } catch (err) {
        console.log(err);
        this.adding = false;
        // eslint-disable-next-line no-unused-vars
        const { response, message } = err;

        this.$store.commit(
          'snackbar/show',
          `${(response && response.data.payload) || 'Network Error'}.`
        );
      }
    },
    requestService() {}
  },
  head() {
    return {
      title: `${this.name} - ${this.vendor.businessName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.shortDescription || ''}. ${this.description}`
        }
      ]
    };
  }
};
</script>

<style></style>
