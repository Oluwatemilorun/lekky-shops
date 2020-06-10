<template>
  <v-card
    :width="width || '100%'"
    height="100%"
    color="white"
    hover
    :to="`/services/${service._id}`"
  >
    <v-row no-gutters class="ma-0 flex-column">
      <v-img
        :src="service.cover"
        aspect-ratio="1.3"
        class="grey lighten-2"
        height="150px"
      >
        <template v-slot:placeholder>
          <v-container fill-height fluid>
            <v-row justify="center" align="center">
              <v-progress-circular indeterminate color="primary" />
            </v-row>
          </v-container>
        </template>
        <v-row no-gutters justify="space-around" class="flex-column pa-3">
          <v-col class="flex-grow">
            <v-row no-gutters align="center">
              <v-col>
                <v-chip
                  color="accent"
                  label
                  small
                  class="text-capitalize caption white--text"
                  @click.native="
                    $router.push(
                      `/category/${service.subCategory.replace(/ /g, '-')}`
                    )
                  "
                >
                  {{ service.subCategory }}
                </v-chip>
              </v-col>
              <v-col cols="auto">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      small
                      icon
                      text
                      :loading="adding"
                      class="ma-0"
                      v-on="on"
                      @click.stop="addToFavourite"
                    >
                      <v-icon v-if="isFavourite" color="tertiary">
                        mdi-heart
                      </v-icon>
                      <v-icon v-else>
                        mdi-heart-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>{{
                    isFavourite ? 'Remove from favourites' : 'Add to favourites'
                  }}</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-spacer></v-spacer> -->
          <v-col cols="auto">
            <div class="caption text-truncate ma-1">
              <v-icon size="15px" color="accent" class="pr-1">
                mdi-map-marker
              </v-icon>
              {{ service.location }}
            </div>
          </v-col>
        </v-row>
      </v-img>
      <v-row class="ma-0" style="min-height: 150px">
        <v-col cols="12">
          <h3 class="mb-0 font-weight-bold title">
            {{ service.name }}
          </h3>
          <p class="body-2 mb-0">
            {{ service.shortDescription }}
          </p>
        </v-col>
        <v-col cols="12">
          <p class="caption accent--text">
            <span class="tertiary--text">Provided by:</span>
            <v-menu
              offset-x
              open-on-hover
              transition="slide-x-transition"
              bottom
              right
            >
              <template v-slot:activator="{ on }">
                <div
                  class="accent--text d-inline-flex"
                  v-on="on"
                  @click.self="$router.push(`/v/${service.vendor.username}`)"
                >
                  {{ service.vendor.businessName }}
                </div>
              </template>
              <v-card
                width="280px"
                height="150px"
                class="vendor-preview-card elevation-2"
                @click.native="$router.push(`/v/${service.vendor.username}`)"
              >
                <v-row no-gutters>
                  <v-col cols="5" class="pa-0">
                    <v-img
                      :src="service.vendor.logo || ''"
                      class="primary lighten-2"
                      width="100%"
                      height="150px"
                    >
                      <template v-slot:placeholder>
                        <v-container fill-height fluid>
                          <v-row justify="center" align="center">
                            <v-progress-circular
                              indeterminate
                              color="primary"
                            />
                          </v-row>
                        </v-container>
                      </template>
                    </v-img>
                  </v-col>
                  <v-col cols="7">
                    <v-row class="ma-0">
                      <v-col cols="12" class="pb-1">
                        <h5 class="mb-1" style="font-size: 16px">
                          {{ service.vendor.businessName }}
                        </h5>
                        <p class="mb-2 caption" style="line-height: 1">
                          {{ service.vendor.shortDescription }}
                        </p>
                        <div
                          class="caption d-inline-block font-weight-light"
                          style="line-height: 1"
                        >
                          <v-icon color="accent" size="13px">
                            mdi-map-marker
                          </v-icon>
                          {{ service.vendor.businessAddress }},
                          <a
                            :href="
                              `/category/${service.subCategory.replace(
                                / /g,
                                '-'
                              )}?country=${service.vendor.businessCountry}`
                            "
                            class="accent--text"
                          >
                            {{ service.vendor.businessCountry }}
                          </a>
                        </div>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-row no-gutters align="center">
                          <v-rating
                            v-model="service.vendor.businessRating"
                            color="yellow accent-4"
                            dense
                            hover
                            half-increments
                            size="13"
                            readonly
                          />
                          <span class="grey--text text--darken-2 caption mx-1">
                            {{ service.vendor.businessRating }}
                          </span>
                          <span class="grey--text text--lighten-1 caption mr-2">
                            ({{
                              service.vendor.businessReviews &&
                                service.vendor.businessReviews.length
                            }})
                          </span>
                        </v-row>
                      </v-col>
                      <!-- <v-col shrink pa-0>
												<v-btn color="accent" block small class="white--text ma-0" :to="`/v/${service.vendor.username}`">visit page</v-btn>
											</v-col>-->
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-menu>
          </p>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters align="center">
            <v-rating
              v-model="service.rating"
              color="yellow accent-4"
              dense
              hover
              half-increments
              size="13"
              readonly
            />
            <span class="grey--text text--darken-2 caption mx-1">{{
              service.rating
            }}</span>
            <span class="grey--text text--lighten-1 caption mr-2">
              ({{ service.reviews && service.reviews.length }})
            </span>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters align="center">
            <p class="font-weight-bold ma-0">
              <v-icon size="14">
                {{ service.currency && service.currency.icon }}
              </v-icon>
              {{ service.amount }}
            </p>
            <v-spacer />
            <v-btn small color="accent">
              request
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>

<script>
/* eslint-disable no-unused-vars */
import axios from '~/plugins/axios';

export default {
  props: ['width', 'service'],
  data() {
    const userLike = !!(
      this.service &&
      this.$store.state.user.isSignedIn &&
      this.service.likedBy.filter(
        (a) => a.user === this.$store.state.user.user.userId
      ).length > 0
    );

    return {
      rating: 4.5,
      isFavourite: userLike,
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
          const { data, status } = await this.$axios.post(
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
          const { data, status } = await this.$axios.post(
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
        const { response, message } = err;

        this.$store.commit(
          'snackbar/show',
          `${(response && response.data.payload) || 'Network Error'}.`
        );
      }
    }
  }
};
</script>

<style>
.v-card.vendor-preview-card {
  position: relative;
  display: block;
}
.v-card.vendor-preview-card::before,
.v-card.vendor-preview-card::after {
  content: '';
  position: absolute;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #000;
  top: calc(50% - 10px);
  right: 100%;
}

.v-card.vendor-preview-card::before {
  top: calc(50% - 10px + 2px);
  background-color: #fff;
  /* -webkit-transform: rotate(180deg); */
  /* transform: rotate(180deg); */
  /* left: 100%; */
  border-right-color: rgba(0, 0, 0, 0.12);
}
.v-card.vendor-preview-card::after {
  border-right-color: inherit;
  background-color: #fff;
  /* -webkit-transform: rotate(180deg); */
  /* transform: rotate(180deg); */
  /* left: 100%; */
}
</style>
