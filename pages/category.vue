<template>
  <div class="category">
    <PageTitle title="All Categories" />
    <v-container style="margin-top: -95px">
      <v-row justify="center">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <!-- Adding search Component-->
              <search />
            </v-card-title>
            <v-container>
              <v-row dense justify-center>
                <v-col
                  v-for="brand in brands"
                  :key="brand.name"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card class="my-4">
                    <v-img
                      :src="brand.src"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="300px"
                    >
                      <v-card-title class="white--text">
                        <v-btn rounded color="primary" dark>
                          {{ brand.name }}
                        </v-btn>
                      </v-card-title>
                      <v-card-subtitle class="caption mx-4 white--text">
                        {{ brand.city }}
                      </v-card-subtitle>
                    </v-img>
                    <v-card-text>
                      <div class="title">
                        {{ brand.service }}
                      </div>
                      <div>{{ brand.info }}</div>
                    </v-card-text>
                    <v-card-actions>
                      <v-rating v-model="brand.rating" />
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <div class="text-center my-10">
            <v-pagination
              v-model="pagination.page"
              :length="pagination.length"
              :total-visible="pagination.totalVisible"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import person1 from '~/assets/img/person-1.jpg';
import person2 from '~/assets/img/person-2.jpg';
import person3 from '~/assets/img/person-3.jpg';
import PageTitle from '~/components/pageTitle';
import search from '~/components/search.vue';

export default {
  name: 'category',
  components: {
    search,
    PageTitle
  },
  data: () => ({
    locationList: ['Lagos', 'Akure', 'Abuja', ' Port Harcourt', 'Kano'],
    brandList: [
      'Emeka Limited',
      'Kunle Bespoke',
      'Zara Graphix',
      'YBNL Records'
    ],
    categoryList: [
      'Health',
      'Marketing',
      'Child Care',
      'Web Services',
      'Fashion'
    ],
    brands: [
      {
        name: 'Emeka Lmited',
        src: person1,
        service: 'Digital Marketer',
        city: 'Lagos, Nigeria',
        rating: 5,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'Kunle Bespoke',
        src: person2,
        service: 'Fashion Designer',
        city: 'Lagos, Nigeria',
        rating: 4,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'Bunmi Davies',
        src: person3,
        service: 'Actor, Movie Producer',
        city: 'Lagos, Nigeria',
        rating: 5,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'The Khitan David',
        src: person2,
        service: 'Graphic Designer',
        city: 'Lagos, Nigeria',
        rating: 2,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'Heart of God Foundation',
        src: person1,
        service: 'Orphanage Homes',
        city: 'Lagos, Nigeria',
        rating: 5,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'Lambo Homes',
        src: person3,
        service: 'Digital Marketer',
        city: 'Lagos, Nigeria',
        rating: 3,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'Emeka Lmited',
        src: person1,
        service: 'Digital Marketer',
        city: 'Lagos, Nigeria',
        rating: 4,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'Studio Brat Entertainment',
        src: person3,
        service: 'Digital Marketer',
        city: 'Lagos, Nigeria',
        rating: 5,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      },
      {
        name: 'Star Laboratory',
        src: person2,
        service: 'Digital Marketer',
        city: 'Lagos, Nigeria',
        rating: 4,
        info:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa.'
      }
    ],
    pagination: {
      page: 1,
      length: 10,
      totalVisible: 6
    }
  })
};
</script>
