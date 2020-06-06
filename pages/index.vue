<template>
  <div class="home">
    <!-- Slider -->
    <v-carousel
      cycle
      hide-delimiters
      :show-arrows="false"
      interval="4000"
      height="320"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
        transition="scroll-x-transition"
        reverse-transition="scroll-x-reverse-transition"
        align-end
      >
        <v-container class="white--text px-10" style="margin-top: 100px">
          <h2 class="display-2">
            <strong>Do More For Less</strong>
          </h2>
          <span class="headline">
            <strong>Discover professionals near you</strong>
          </span>
        </v-container>
      </v-carousel-item>
    </v-carousel>

    <!-- Adding _Search Component-->
    <v-container style="margin-top: -85px">
      <v-row justify="center">
        <v-col cols="12">
          <v-card elevation="5">
            <v-card-text>
              <search />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Explore Categories -->
    <v-container>
      <h3 class="display-1 mt-10 mb-5 text-center">
        <strong>Explore Categories</strong>
      </h3>
      <v-row dense justify-center>
        <v-col
          v-for="item in categoryList"
          :key="item.text"
          cols="6"
          sm="4"
          md="4"
        >
          <v-card class="my-4" to="/category">
            <v-img
              :src="item.src"
              class="white--text align-center text-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <div class="subtitle-1 font-weight-bold white--text">
                {{ item.text }}
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- How It Works -->
    <div class="my-10 text-center">
      <v-sheet min-height="400" tile color="grey lighten-3" class="my-10 pa-10">
        <h3 class="display-1 pt-10">
          <strong>How It Works</strong>
        </h3>
        <v-container>
          <v-row>
            <v-col
              v-for="n in howItWorks"
              :key="n"
              cols="12"
              sm="4"
              class="my-5"
            >
              <v-icon color="primary" x-large>
                {{ n.icon }}
              </v-icon>
              <div>
                <h3 class="subtitle-1">
                  <strong>{{ n.title }}</strong>
                </h3>
              </div>
              <div>{{ n.text }}</div>
            </v-col>
          </v-row>
          <div class="pa-3">
            <v-btn large dark color="error" class="my-10">
              Get Started
            </v-btn>
          </div>
        </v-container>
      </v-sheet>
    </div>

    <!-- Why Use LekkyShops -->
    <div class="my-10 text-center">
      <v-sheet min-height="400" tile class="my-10 pa-10">
        <h3 class="display-1 py-10">
          <strong>Why Use LekkyShops</strong>
        </h3>
        <v-container>
          <v-row>
            <v-col v-for="n in whyUse" :key="n" cols="12" sm="4" class="my-5">
              <v-icon color="primary" x-large>
                {{ n.icon }}
              </v-icon>
              <div>
                <h3 class="subtitle-1">
                  <strong>{{ n.title }}</strong>
                </h3>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>

    <!-- What Our Clients Are Saying -->
    <div class="mb-10">
      <v-container>
        <h3 class="display-1 my-10 text-center">
          <strong>What Our Clients Are Saying</strong>
        </h3>
        <v-carousel
          cycle
          hide-delimiter-background
          delimeter-icon="mdi-minus"
          interval="4000"
          height="320"
        >
          <v-carousel-item
            v-for="(client, i) in clients"
            :key="i"
            transition="scroll-x-transition"
            reverse-transition="scroll-x-reverse-transition"
          >
            <v-sheet height="360" dark color="teal lighten-2" tile>
              <v-row>
                <v-col cols="6" sm="5" lg="4">
                  <v-img
                    :src="client.pic"
                    height="360"
                    style="margin-top: -12px"
                  />
                </v-col>
                <v-col cols="6" sm="7" lg="8" class="pa-sm-10">
                  <figure>
                    <blockquote class="blockquote subtitle-1">
                      <v-icon>mdi-quote</v-icon>
                      {{ client.quote }}
                      <v-icon>mdi-quote</v-icon>
                    </blockquote>
                    <fig-caption class=" pl-5 headline">
                      - {{ client.name }}
                    </fig-caption>
                  </figure>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </div>

    <!-- Hire or Get Hired -->
    <div class="mt-10">
      <v-sheet min-height="250" dark color="teal lighten-2" tile>
        <v-container>
          <v-row class="mt-10">
            <v-col cols="6">
              <h3 class="display-2">
                <strong>Hire or Get Hired!</strong>
              </h3>
              <p class="headline">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                blanditiis dolorem culpa
              </p>
            </v-col>
            <v-col cols="6" class="mt-10 text-right">
              <v-btn outlined x-large class="mr-5">
                Get Started
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
    <!-- -->
  </div>
</template>

<script>
import search from '@/components/search.vue';

import image1 from '@/assets/img/work-1.jpg';
import image2 from '@/assets/img/work-2.jpg';
import image3 from '@/assets/img/work-3.jpg';

import slide1 from '@/assets/img/slide-1.jpg';
import slide2 from '@/assets/img/bg-intro.png';

export default {
  name: 'home',
  components: {
    search
  },
  data: () => ({
    image1,
    slides: [{ src: slide1 }, { src: slide2 }],
    categoryList: [
      { text: 'Health', src: image1 },
      { text: 'Business', src: image2 },
      { text: 'Web Services', src: image3 },
      { text: 'Child Care', src: image1 },
      { text: 'Hair & Beauty', src: image3 },
      { text: 'Adult Services', src: image2 },
      { text: 'Cleaning', src: image3 },
      { text: 'Business', src: image2 },
      { text: 'Beauty & Spa', src: image1 }
    ],
    howItWorks: [
      {
        title: 'Describe Your Task',
        icon: 'mdi-account-book',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa'
      },
      {
        title: 'Describe Your Task',
        icon: 'mdi-account-book',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa'
      },
      {
        title: 'Describe Your Task',
        icon: 'mdi-account-book',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa'
      }
    ],
    whyUse: [
      { title: 'Saves Time', icon: 'mdi-account-book' },
      { title: 'Safety First', icon: 'mdi-account-book' },
      { title: 'Only The Best Quality', icon: 'mdi-account-book' },
      { title: 'Easy to Get Help', icon: 'mdi-account-book' },
      { title: 'Seamless Communication', icon: 'mdi-forum' },
      { title: 'Cash-free Payment', icon: 'mdi-account-book' }
    ],
    clients: [
      {
        name: 'David Michael',
        pic: image1,
        quote: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Est blanditiis dolorem culpa incidunt minus dignissimos deserunt
                repellat aperiam quasi sunt.`
      },
      {
        name: 'Janet Jackson',
        pic: image2,
        quote: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Est blanditiis dolorem culpa incidunt minus dignissimos deserunt
                repellat aperiam quasi sunt officia expedita.`
      },
      {
        name: 'Jane Doe',
        pic: image3,
        quote: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Est blanditiis dolorem culpa incidunt minus dignissimos deserunt
                repellat aperiam quasi sunt officia `
      }
    ]
  })
};
</script>
