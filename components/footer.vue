<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" class="text-center py-4">
      <v-btn
        v-for="icon in foot_icons"
        :key="icon"
        icon
        class="mx-4 white-text"
      >
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" class="text-center py-4">
      <v-btn
        v-for="link in foot_links"
        :key="link"
        text
        tile
        class="mx-4 white--text"
        :to="link.to"
      >
        {{ link.text }}
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-row style="background: #222" class="px-4">
        <v-col cols="6">
          <span> &copy; {{ new Date().getFullYear() }}</span>
        </v-col>
        <v-col cols="6" class="text-right">
          <span>LekkyShops</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'footer',

  data: () => ({
    foot_links: [
      { text: 'Home', to: '/' },
      { text: 'About Us', to: '/about' },
      { text: 'Categories', to: '/category' },
      { text: 'FAQs', to: '/' },
      { text: 'Privacy Policy', to: '/' },
      { text: 'Contact Us', to: '/contact' }
    ],
    foot_icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-instagram',
      'mdi-linkedin',
      'mdi-medium'
    ]
  })
};
</script>

<style></style>
