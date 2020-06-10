<template>
  <div>
    <v-navigation-drawer app class="grey darken-2" dark width="280">
      <v-toolbar dense color="primary" flat>
        <v-row align="center" justify="center">
          <img
            src="~/assets/img/logo.jpg"
            alt="Cartts"
            width="90px"
            class="text-uppercase primary--text"
          />
        </v-row>
      </v-toolbar>

      <v-img :aspect-ratio="16 / 9" src="/static/img/slides/01.jpg">
        <v-container fill-height>
          <v-row
            no-gutters
            justify="center"
            align="center"
            class="lightbox white--text flex-column"
          >
            <v-avatar size="52" color="white" class="mb-2" outlined>
              <v-icon color="grey darken-3" size="30px">
                mdi-account
              </v-icon>
            </v-avatar>
            <div class="subheading font-weight-bold truncate text-capitalize">
              Admin Console
            </div>
          </v-row>
        </v-container>
      </v-img>

      <v-divider />

      <v-list dense>
        <v-list-item
          dark
          active-class="primary bordered-left"
          exact
          to="/admin"
        >
          <v-list-item-avatar>
            <v-icon>mdi-home</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Overview</v-list-item-title>
          <v-list-item-action>
            <v-menu open-on-hover offset-x>
              <template v-slot:activator="{ on }">
                <v-hover>
                  <v-btn slot-scope="{ hover }" icon flat dark v-on="on">
                    <v-icon>mdi-settings</v-icon>
                    <v-slide-x-transition>
                      <v-icon v-if="hover">
                        mdi-chevron-right
                      </v-icon>
                    </v-slide-x-transition>
                  </v-btn>
                </v-hover>
              </template>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title>Account settings</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>General settings</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense subheader>
        <v-subheader>Resources</v-subheader>
        <v-list-item
          avatar
          dark
          active-class="primary bordered-left"
          to="/admin/users"
        >
          <v-list-item-avatar>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>All users</v-list-item-title>
        </v-list-item>
        <v-list-item
          avatar
          dark
          active-class="primary bordered-left"
          to="/admin/vendors"
        >
          <v-list-item-avatar>
            <v-icon>mdi-worker</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>All vendors</v-list-item-title>
        </v-list-item>
        <v-list-item
          avatar
          dark
          active-class="primary bordered-left"
          to="/admin/services"
        >
          <v-list-item-avatar>
            <v-icon>mdi-dns</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>All services</v-list-item-title>
        </v-list-item>
        <v-list-item avatar dark active-class="primary bordered-left">
          <v-list-item-avatar>
            <v-icon>mdi-chart-bubble</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>All products</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense subheader>
        <v-subheader>Management</v-subheader>
        <v-list-item
          avatar
          dark
          active-class="primary bordered-left"
          to="/admin/categories"
        >
          <v-list-item-avatar>
            <v-icon>mdi-hexagon-multiple</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Categories</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item avatar dark>
					<v-list-item-avatar>
						<v-icon>mdi-account-multiple</v-icon>
					</v-list-item-avatar>
					<v-list-item-title>All users</v-list-item-title>
				</v-list-item>
				<v-list-item avatar dark>
					<v-list-item-avatar>
						<v-icon>mdi-worker</v-icon>
					</v-list-item-avatar>
					<v-list-item-title>All vendors</v-list-item-title>
				</v-list-item> -->
      </v-list>

      <v-divider />

      <v-list dense subheader>
        <v-subheader>Statistics</v-subheader>
        <v-list-item avatar dark>
          <v-list-item-avatar>
            <v-icon>mdi-chart-line-stacked</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Usage</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item avatar dark>
					<v-list-item-avatar>
						<v-icon>mdi-account-multiple</v-icon>
					</v-list-item-avatar>
					<v-list-item-title>All users</v-list-item-title>
				</v-list-item>
				<v-list-item avatar dark>
					<v-list-item-avatar>
						<v-icon>mdi-worker</v-icon>
					</v-list-item-avatar>
					<v-list-item-title>All vendors</v-list-item-title>
				</v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {};
</script>

<style>
.bordered-left {
  border-right: 2px solid red;
}
</style>

() => {}
