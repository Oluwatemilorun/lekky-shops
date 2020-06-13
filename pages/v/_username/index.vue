<template>
  <v-row>
    <v-col cols="12" class="relative pa-0">
      <v-img :src="cover || defCover" height="350px">
        <v-overlay absolute color="tertiary" opacity="0.3" />
      </v-img>
    </v-col>
    <v-col cols="12" class="pa-0 relative" style="z-index: 1">
      <v-container style="margin-top: -150px">
        <v-row>
          <v-col cols="12" lg="3">
            <v-avatar
              size="230px"
              color="grey lighten-5"
              style="border: 7px #ddd solid"
              class="mx-auto d-block"
            >
              <v-img
                :src="logo"
                class="primary lighten-2"
                width="100%"
                height="100%"
              >
                <template v-slot:placeholder>
                  <v-container fluid fill-height>
                    <v-row justify="center" align="center">
                      <v-progress-circular indeterminate color="primary" />
                    </v-row>
                  </v-container>
                </template>
              </v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" lg="9">
            <v-row align="center" class="fill-height">
              <div class="text-xs-left mt-n10">
                <h1
                  class="display-1 font-weight-medium text-capitalize"
                  :class="{ 'white--text': $vuetify.breakpoint.lg }"
                >
                  {{ businessName }}
                </h1>
                <span
                  class="subheading font-weight-medium text-capitalize"
                  :class="{ 'white--text': $vuetify.breakpoint.lg }"
                >
                  {{ category }}
                </span>
              </div>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12">
                <v-card class="elevation-3" color="white">
                  <v-card-title
                    primary-title
                    class="title black--text font-weight-medium"
                  >
                    Vendor Details
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-row row wrap ma-0>
                      <v-col cols="12" pa-0>
                        <p class="">
                          {{ shortDescription }}
                        </p>
                        <p class="">
                          {{ description }}
                        </p>
                      </v-col>
                      <v-col cols="12" pa-0>
                        <p
                          class="caption py-1 d-inline-block ma-0"
                          style="line-height: 1"
                        >
                          <v-icon color="accent" size="12px" class="pr-1">
                            mdi-map-marker
                          </v-icon>
                          {{ businessAddress }},
                          <a
                            :href="
                              `/category/${subCategory.replace(
                                / /g,
                                '-'
                              )}?country=${businessCountry}`
                            "
                            class="accent--text"
                          >
                            {{ businessCountry }}
                          </a>
                        </p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-row no-gutters align="center" justify="center">
                      <v-col cols="12">
                        <v-btn
                          block
                          :outline="!isFavourite"
                          :loading="adding"
                          :color="isFavourite ? 'amber' : ''"
                          class="caption my-2"
                          @click.stop="addToFavourite"
                        >
                          <v-icon
                            v-if="isFavourite"
                            size="15px"
                            class="pr-1"
                            color="black"
                          >
                            mdi-heart
                          </v-icon>
                          <v-icon v-else size="15px" class="pr-1">
                            mdi-heart-outline
                          </v-icon>
                          {{ isFavourite ? 'favourite' : 'add to favourite' }}
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-btn block color="accent" class="my-2">
                          hire
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="9">
            <v-row>
              <v-col cols="12">
                <v-card flat outlined color="white">
                  <v-card-title
                    primary-title
                    class="subheading white--text font-weight-medium primary"
                  >
                    SERVICES
                  </v-card-title>
                  <v-row>
                    <v-col
                      v-for="service in services"
                      :key="service._id"
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <ServiceCard :service="service" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card outlined flat color="white">
                  <v-card-title
                    primary-title
                    class="subheading white--text font-weight-medium primary"
                  >
                    Portfolio / Gallery
                  </v-card-title>
                  <v-row row wrap ma-0>
                    <v-col xs6 sm4 md3 />
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card outlined flat color="white">
                  <v-card-title
                    primary-title
                    class="subheading white--text font-weight-medium primary"
                  >
                    Reviews
                  </v-card-title>
                  <v-row row wrap ma-0>
                    <v-col cols="12">
                      <ReviewCard />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import defCover from '~/assets/img/def-cover.jpg';

import ServiceCard from '~/components/_parts/ServiceCard';
import ReviewCard from '~/components/_parts/ReviewCard';

export default {
  components: { ServiceCard, ReviewCard },
  async asyncData({ $axios, params, query, error, store }) {
    try {
      const { username } = params;

      const { data, status, statusText } = await $axios.get(
        `/api/vendor/preview/${username}`
      );

      if (data.state === 'NO')
        return error({ statusCode: status, message: statusText });

      const userLike = !!(
        store.state.user.isSignedIn &&
        data.payload.likedBy &&
        data.payload.likedBy.filter(
          (a) => a.user === store.state.user.user.userId
        ).length > 0
      );

      return {
        ...data.payload,
        id: data.payload._id,
        isFavourite: userLike,
        breadcrumbs: [
          { text: 'home', path: '/' },
          {
            text: data.payload.businessName,
            path: `/v/${data.payload.username}`,
            disabled: true
          }
        ]
      };
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    // eslint-disable-next-line no-unused-vars
    const userLike = !!(
      this.service &&
      this.$store.state.user.isSignedIn &&
      this.service.likedBy.filter(
        (a) => a.user === this.$store.state.user.user.userId
      ).length > 0
    );
    return {
      defCover,
      loading: false,
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
          // eslint-disable-next-line no-unused-vars
          const { data, status } = await this.$axios.post(
            '/api/user/favourites/vendor/remove',
            {
              vendorId: this.id
            }
          );

          this.adding = false;
          this.isFavourite = false;
          this.$store.commit(
            'snackbar/show',
            `Vendor removed from favourites successfully.`
          );
          // this.$router.go();
        } else {
          // service is not yet a favourite
          // eslint-disable-next-line no-unused-vars
          const { data, status } = await this.$axios.post(
            '/api/user/favourites/vendor/add',
            {
              vendorId: this.id
            }
          );

          this.adding = false;
          this.isFavourite = true;
          this.$store.commit(
            'snackbar/show',
            `Vendor added to favourites successfully.`
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
    }
  },
  head() {
    return {
      title: `${this.businessName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.description}`
        }
      ]
    };
  }
};
</script>

<style></style>
