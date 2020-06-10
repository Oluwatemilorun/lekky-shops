<template>
  <v-card height="250px" hover class="pa-0" :to="`services/${service._id}`">
    <v-row row wrap class="ma-0">
      <v-col cols="4" class="pa-0">
        <v-img
          :src="service.cover"
          aspect-ratio="1.3"
          class="grey lighten-2"
          height="250px"
          width="100%"
        >
          <template v-slot:placeholder>
            <v-container fill-height>
              <v-row align="center" justify="center">
                <v-progress-circular indeterminate color="primary" />
              </v-row>
            </v-container>
          </template>
          <v-row no-gutters justify="center" class="flex-direction-column pa-3">
            <!-- <v-col xs1>
							<v-btn text icon color="primary">
								<v-icon>mdi-pin</v-icon>
							</v-btn>
						</v-col>-->
            <v-spacer />
            <v-col cols="auto">
              <v-chip
                v-if="service.isApproved"
                color="success"
                label
                small
                class="text-capitalize"
              >
                <v-icon left>
                  mdi-check
                </v-icon>
                Approved
              </v-chip>
              <v-chip
                v-else
                color="warning"
                label
                small
                class="text-capitalize"
              >
                <v-icon left>
                  mdi-alert-circle
                </v-icon>
                Pending approval
              </v-chip>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
      <v-col cols="8">
        <v-row class="overflow-y">
          <v-col cols="12">
            <v-chip color="accent" label small class="text-capitalize">
              {{ service.category }}
            </v-chip>
            <h3 class="title mb-1 font-weight-bold">
              {{ service.name }}
            </h3>
            <p class="subtitle mb-1">
              {{ service.shortDescription }}
            </p>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters align="center">
              <div class="grey--text mr-2">
                Rating and reviews
              </div>
              <v-rating
                v-model="service.rating"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
                readonly
              />
              <span class="grey--text text--darken-2 caption mx-1">{{
                service.rating
              }}</span>
              <span class="grey--text text--lighten-1 caption mr-2">
                ({{ service.reviews && service.reviews.length }})
              </span>
            </v-row>
            <div>
              <p class="font-weight-bold my-1">
                <span class="grey--text font-weight-regular mr-2">Price</span>
                <v-icon size="15">
                  {{ service.currency && service.currency.icon }}
                </v-icon>
                {{ service.amount }}
              </p>
              <p class="font-weight-bold my-1">
                <span class="grey--text font-weight-regular mr-2">
                  Discount
                </span>
                {{ service.discount }}%
              </p>
              <p class="font-weight-bold my-1">
                <span class="grey--text font-weight-regular mr-2">
                  Completed requests
                </span>
                {{ service.requestedBy.length }}
              </p>
            </div>
          </v-col>

          <!-- <v-col xs12>
						<v-card-actions class="pa-3">
							<v-btn small text="" color="primary" dark>Read reviews</v-btn>
							<v-spacer></v-spacer>
							<v-btn small color="red darken-1" dark>Delete service</v-btn>
							<v-btn small color="primary">Edit service</v-btn>
						</v-card-actions>
					</v-col>-->
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['service'],
  data() {
    return {
      rating: 4.5,
      isFavourite: true
    };
  }
};
</script>

<style></style>
