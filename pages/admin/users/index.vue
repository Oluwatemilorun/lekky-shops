<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card color="white" height="200px">
          <v-card-title primary-title class="primary">
            <div class="title font-weight-bold white--text">
              Total users
            </div>
          </v-card-title>
          <v-row no-gutters align="center" class="fill-height px-4 ma-0">
            <div class="display-1 font-weight-bold">
              {{ noUsers || '- -' }}
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="white" height="200px">
          <v-card-title primary-title class="primary">
            <div class="title font-weight-bold white--text">
              Active users
            </div>
          </v-card-title>
          <v-row no-gutters align="center" class="fill-height px-4 ma-0">
            <div class="display-1 font-weight-bold">
              {{ noUsers || '- -' }}
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <!-- <v-card color="white" height="200px">
					<v-card-title primary-title class="primary">
						<div class="title font-weight-bold white--text">Active users</div>
					</v-card-title>
					<v-row no-gutters align="center" class="fill-height px-4 ma-0">
						<div class="display-1 font-weight-bold">{{noUsers || '- -'}}</div>
					</v-row>
				</v-card> -->
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row no-gutters align="center" class="pa-4">
            <div class="font-weight-medium headline px-3">
              All users
            </div>
            <v-spacer />
            <v-btn v-if="selected.length >= 1" dark color="red darken-1">
              Delete selected
            </v-btn>
            <v-col cols="auto">
              <v-text-field
                v-model="search"
                label="Search users"
                solo
                flat
                background-color="tertiary lighten-5"
                hide-details
              >
                <template slot="prepend-inner">
                  <v-icon color="black">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="tableItems"
            hide-actions
            class=""
            item-key="_id"
            loading="true"
            :search="search"
          >
            <template v-slot:items="props">
              <tr @click.stop="$router.push(`/admin/users/${props.item._id}`)">
                <!-- <td>
									<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
								</td> -->
                <td>
                  <v-avatar
                    size="50px"
                    color="primary lighten-2"
                    class="my-2 d-block mx-auto"
                  >
                    <img :src="props.item.avatar" alt="" />
                  </v-avatar>
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>
                  <v-row justify-center row wrap>
                    <v-chip
                      v-if="props.item.isVendor"
                      dark
                      small
                      color="primary"
                    >
                      Is a vendor
                    </v-chip>
                    <v-chip v-else dark small color="red darken-2">
                      Not a vendor
                    </v-chip>
                  </v-row>
                </td>
                <td>
                  <v-row justify-center row wrap>
                    <v-chip
                      v-if="props.item.isActive"
                      dark
                      small
                      color="green darken-1"
                    >
                      Active
                    </v-chip>
                    <v-chip v-else dark small color="red darken-2">
                      Inactive
                    </v-chip>
                  </v-row>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, req, error }) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data, status, statusText } = await $axios.get('/api/admin/users');
      console.log(data.payload);

      if (data.state === 'OK') {
        return {
          tableItems: data.payload,
          noUsers: data.payload.length
        };
      } else {
        error({ statusCode: status, message: data.payload });
      }
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Avatar',
          value: 'avatar',
          align: 'center',
          sortable: false,
          // class: string[] | string"
          width: '60px'
        },
        {
          text: 'Fullname',
          value: 'name',
          align: 'left',
          sortable: true
          // class: string[] | string"
          // width: string
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'left',
          sortable: true
        },
        {
          text: 'Vendor state',
          value: 'isVendor',
          align: 'center',
          sortable: false,
          width: '100px'
        },
        {
          text: 'Status',
          value: 'isActive',
          align: 'center',
          sortable: false,
          width: '100px'
        }
      ],
      search: null,
      selected: [],
      sparklineLabels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      sparklineValues: [200, 300, 100, 700, 150, 300, 400]
    };
  }
};
</script>

<style></style>
