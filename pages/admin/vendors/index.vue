<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap ma-0>
      <v-flex xs12 md4>
        <v-card color="primary lighten-2" height="200px">
          <v-layout column fill-height wrap pa-3>
            <v-spacer />
            <v-flex shrink class="text-xs-right">
              <div class="title font-weight-bold">
                Total vendors
              </div>
              <div class="display-1 font-weight-light">
                {{ noVendors || '- -' }}
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card color="primary lighten-2" height="200px">
          <v-layout column fill-height wrap pa-3>
            <v-spacer />
            <v-flex shrink class="text-xs-right">
              <div class="title font-weight-bold">
                Total active vendors
              </div>
              <div class="display-1 font-weight-light">
                1000
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card color="primary lighten-2" height="200px">
          <v-layout column fill-height wrap pa-3>
            <v-flex>
              <v-sheet color="transparent">
                <v-sparkline
                  :labels="sparklineLabels"
                  :value="sparklineValues"
                  :gradient="['purple', 'violet']"
                  line-width="2"
                  padding="15"
                  height="190"
                />
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-layout align-center row wrap ma-0>
            <div class="font-weight-medium headline px-3">
              All vendors
            </div>
            <v-spacer />
            <v-btn v-if="selected.length >= 1" dark color="red darken-1">
              Delete selected
            </v-btn>
            <v-flex shrink>
              <v-text-field
                v-model="search"
                label="Search vendors"
                solo
                hide-details
              >
                <template slot="prepend-inner">
                  <v-icon color="black">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-text-field>
            </v-flex>
          </v-layout>
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
              <tr
                @click.stop="$router.push(`/admin/vendors/${props.item._id}`)"
              >
                <td>
                  <v-avatar
                    size="50px"
                    color="primary lighten-2"
                    class="my-2 d-block mx-auto"
                  >
                    <img :src="props.item.logo" alt="" />
                  </v-avatar>
                </td>
                <td>{{ props.item.businessName }}</td>
                <td>{{ props.item.businessEmail }}</td>
                <td>{{ props.item.category }}</td>
                <td>{{ props.item.services && props.item.services.length }}</td>
                <td>{{ props.item.products && props.item.products.length }}</td>
                <td>{{ props.item.successfulSales }}</td>
                <td>
                  <v-layout justify-center row wrap>
                    <v-chip
                      v-if="props.item.isApproved"
                      dark
                      small
                      color="green darken-1"
                    >
                      Approved
                    </v-chip>
                    <v-chip v-else dark small color="red darken-2">
                      Not approved
                    </v-chip>
                  </v-layout>
                </td>
                <td>
                  <v-layout justify-center row wrap>
                    <v-chip
                      v-if="props.item.isVendor"
                      dark
                      small
                      color="primary"
                    >
                      Active
                    </v-chip>
                    <v-chip v-else dark small color="red darken-2">
                      inactive
                    </v-chip>
                  </v-layout>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, req, error }) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data, status, statusText } = await $axios.get(
        '/api/admin/vendors'
      );
      console.log(data.payload);

      if (data.state === 'OK') {
        return {
          tableItems: data.payload,
          noVendors: data.payload.length
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
          text: 'Logo',
          value: 'logo',
          align: 'center',
          sortable: false,
          // class: string[] | string"
          width: '60px'
        },
        {
          text: 'Business name',
          value: 'businessName',
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
          text: 'Category',
          value: 'category',
          align: 'left',
          sortable: true
        },
        {
          text: 'No services',
          value: 'services',
          align: 'center',
          width: '30px',
          sortable: true
        },
        {
          text: 'No products',
          value: 'products',
          align: 'center',
          width: '30px',
          sortable: true
        },
        {
          text: 'No successful sales',
          value: 'products',
          align: 'center',
          width: '30px',
          sortable: true
        },
        {
          text: 'Approval Status',
          value: 'isApproved',
          align: 'center',
          sortable: false,
          width: '70px'
        },
        {
          text: 'state',
          value: 'isActive',
          align: 'center',
          sortable: false,
          width: '70px'
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
