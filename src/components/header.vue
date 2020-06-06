<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense>
        <v-list-item
          v-for="link in nav_links"
          :key="link.text"
          link
          :to="link.to"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="mt-4" link>
          <v-list-item-action>
            <v-btn>
              <v-icon class="mx-2">mdi-plus-circle</v-icon>Create Account
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar extended>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <!-- Site Logo -->
      <router-link to="/">
        <v-icon class="mx-2" large>mdi-domain</v-icon>
      </router-link>
      <v-toolbar-title>
        <router-link to="/">{{ appTitle }}</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        :append-icon-cb="() => {}"
        placeholder="Search..."
        single-line
        append-icon="mdi-magnify"
        color="black"
        hide-details
      ></v-text-field>

      <v-btn
        text
        v-for="link in nav_links.slice(1)"
        :key="link.text"
        class="hidden-sm-and-down"
      >
        {{ link.text }}
      </v-btn>
      <v-btn class="hidden-sm-and-down">
        <v-icon class="mx-2">mdi-plus-circle</v-icon>Sign up
      </v-btn>
    </v-toolbar>

    <!-- Second toolbar -->
    <v-toolbar dense>
      <v-menu transition="slide-y-transition" bottom offset-y="2">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            All Categories <v-icon class="mx-2">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(category, i) in categories"
            :key="i"
            @click="`{{ category.to }}`"
          >
            <v-list-item-title>
              <v-icon>{{ category.icon }}</v-icon> {{ category.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-for="category in categories"
        :key="category.text"
        class="hidden-xs-only"
      >
        <v-btn text :to="category.to">{{ category.text }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "header",
  data: () => ({
    appTitle: "LekkyShops",
    drawer: null,
    nav_links: [
      { icon: "mdi-home", text: "Home", to: "/" },
      { icon: "mdi-trending-up", text: "How It Works", to: "/about" },
      { icon: "mdi-clock", text: "Become A Vendor", to: "" },
      { icon: "mdi-history", text: "Login", to: "" }
    ],
    categories: [
      { icon: "mdi-trending-up", text: "Business", to: "/" },
      { icon: "mdi-clock", text: "Hair & Beauty", to: "" },
      { icon: "mdi-history", text: "Child Care", to: "" },
      { icon: "mdi-clock", text: "Adult Services", to: "" },
      { icon: "mdi-history", text: "Cleaning", to: "" },
      { icon: "mdi-trending-up", text: "Automobile", to: "" },
      { icon: "mdi-clock", text: "Gadget Repairs", to: "" },
      { icon: "mdi-mouse", text: "Fashion", to: "" },
      { icon: "mdi-monitor", text: "Web Services", to: "" }
    ]
  })
};
</script>

<style></style>
