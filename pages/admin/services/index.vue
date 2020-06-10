<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap ma-0>
      <v-flex xs12 md4>
        <v-card color="primary lighten-2" height="200px">
          <v-layout column fill-height wrap pa-3>
            <v-spacer />
            <v-flex shrink class="text-xs-right">
              <div class="title font-weight-bold">
                Total service
              </div>
              <div class="display-1 font-weight-light">
                {{ noServices || '- -' }}
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
                Total active services
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
              All services
            </div>
            <v-spacer />
            <v-btn v-if="selected.length >= 1" dark color="red darken-1">
              Delete selected
            </v-btn>
            <v-flex shrink>
              <v-text-field
                v-model="search"
                label="Search services"
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
                @click.stop="$router.push(`/admin/services/${props.item._id}`)"
              >
                <!-- <td>
										<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
									</td> -->
                <!-- <td>{{props.item._id}}</td> -->
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.category }}</td>
                <td>{{ props.item.subCategory }}</td>
                <td class="text-xs-right">
                  {{ props.item.amount }}
                </td>
                <td>Per {{ props.item.unit }}</td>
                <td class="text-xs-center">
                  {{ props.item.reviews.length }}
                </td>
                <td class="text-xs-center">
                  {{ props.item.favourites }}
                </td>
                <!-- <td>
										<v-layout justify-center row wrap>
											<v-chip v-if="props.item.isVendor" dark label color="primary">Is a vendor</v-chip>
											<v-chip v-else dark label color="red darken-2">Not a vendor</v-chip>
										</v-layout>
									</td> -->
                <td>
                  <v-layout justify-center row>
                    <v-chip
                      v-if="props.item.isApproved"
                      dark
                      small
                      color="green darken-1"
                      class="caption"
                    >
                      Published
                    </v-chip>
                    <v-chip
                      v-else
                      dark
                      small
                      color="red darken-2"
                      class="caption"
                    >
                      Unpublished
                    </v-chip>
                    <!-- <v-chip v-if="props.item.isActive" dark small label color="green darken-1" class="caption">Active</v-chip>
											<v-chip v-else dark small label color="red darken-2" class="caption">Inactive</v-chip> -->
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
        '/api/admin/services'
      );
      console.log(data.payload);

      if (data.state === 'OK') {
        return {
          tableItems: data.payload,
          noServices: data.payload.length
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
        // {
        // 	text: 'ID',
        // 	value: '_id',
        // 	align: 'center',
        // 	sortable: true,
        // 	// class: string[] | string"
        // 	width: '100px'
        // },
        {
          text: 'Service name',
          value: 'name',
          align: 'left',
          sortable: true
          // class: string[] | string"
          // width: string
        },
        {
          text: 'Category',
          value: 'category',
          align: 'left',
          sortable: true
        },
        {
          text: 'Sub Category',
          value: 'subCategory',
          align: 'left',
          sortable: true
          // width: '100px'
        },
        {
          text: 'Amount',
          value: 'amount',
          align: 'right',
          sortable: true
          // width: '100px'
        },
        {
          text: 'Unit',
          value: 'unit',
          align: 'left',
          sortable: true,
          width: '100px'
        },
        {
          text: 'Reviews',
          value: 'reviews',
          align: 'center',
          sortable: true,
          width: '50px'
        },
        {
          text: 'LIkes',
          value: 'favourites',
          align: 'center',
          sortable: true,
          width: '50px'
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
