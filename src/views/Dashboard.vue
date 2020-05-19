<template>
  <v-container>
    <v-row>
      <v-col cols="4" md="2">
        <v-skeleton-loader
          class="mx-auto"
          max-width="600"
          type="list-item-two-line"
        >
          <v-card>
            <p class="title text-center " style="margin:0">
              997
            </p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>User</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader
          class="mx-auto"
          max-width="600"
          type="list-item-two-line"
        >
          <v-card>
            <p class="title text-center " style="margin:0">
              5
            </p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Repository</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader
          class="mx-auto"
          max-width="600"
          type="list-item-two-line"
        >
          <v-card>
            <p class="title text-center " style="margin:0">
              5
            </p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Repository</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader
          class="mx-auto"
          max-width="600"
          type="list-item-two-line"
        >
          <v-card>
            <p class="title text-center " style="margin:0">
              100
            </p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Target</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader
          class="mx-auto"
          max-width="600"
          type="list-item-two-line"
        >
          <v-card>
            <p class="title text-center " style="margin:0">
              532
            </p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Order</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader
          class="mx-auto"
          max-width="600"
          type="list-item-two-line"
        >
          <v-card>
            <p class="title text-center " style="margin:0">
              88
            </p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Lead</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto">
          <v-subheader style="color:#F44336">Total Transaksi</v-subheader>
          <v-list dense height="200" class="overflow-y-auto">
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in Statistik.Transaksi" :key="i">
                <v-list-item-content>
                  <v-list-item-subtitle>{{ item.month }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ item.total }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto">
          <v-subheader style="color:#9C27B0">Total Unit</v-subheader>
          <v-list dense height="200" class="overflow-y-auto">
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in Statistik.Unit" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.month"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ item.total }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{
                    item.booking
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
];
export default {
  inject: ['theme'],
  data: () => ({
    gradient: gradients[5],
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm'],
    value: [200, 675, 410, 390, 310, 460, 250],
    Dashboard: 6,
    render: false,
    Perfomance: [],
    TopBooking: [],
    TargetStatus: [],
    DealStatus: [],
    LeadStatus: [],
    Statistik: { Transaksi: [], Unit: [] },
    date: '2020-01'
    // Dashboard: ["Users", "Target", "Lead", "Target Call", "Deals", "Orders"]
  }),

  mounted() {
    // this.GetUnit();
    const axios = require('axios');
    axios
      .get(
        'https://shopee.co.id/api/v2/product_catalogue/get?keyword=redmi&limit=10'
      )

      .then(response => {
        let { data } = response.data;
        this.Statistik.Transaksi = data;
        console.log(response);
      })
      .catch(error => {
        let { responses } = error;
        console.log(responses);
      });
  },
  methods: {
    GetUnit() {
      var params = new URLSearchParams();
      params.append('year', '2020');
      var request = {
        params: params
      };

      this.$req
        .get('/api/produk/v1/statistik', request)

        .then(response => {
          let { data } = response.data;
          this.Statistik.Unit = data;
          this.render = true;
          console.log(response);
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetTransaksi() {
      var params = new URLSearchParams();
      params.append('year', '2020');
      var request = {
        params: params
      };

      axios
        .get(
          'https://shopee.co.id/api/v2/product_catalogue/get?keyword=redmi&limit=10&offset=0&sort_type=0',
          request
        )

        .then(response => {
          let { data } = response.data;
          this.Statistik.Transaksi = data;
          console.log(response);
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetPerfomance() {
      var params = new URLSearchParams();
      params.append('tahun', 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/dashboard/perfomance', request)

        .then(response => {
          let { data } = response.data;
          this.Perfomance = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetTargetStatus() {
      var params = new URLSearchParams();
      //   params.append("tahun", 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/target/status', request)

        .then(response => {
          let { data } = response.data;
          this.TargetStatus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetLeadStatus() {
      var params = new URLSearchParams();
      //   params.append("tahun", 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/lead/status', request)

        .then(response => {
          let { data } = response.data;
          this.LeadStatus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetDealStatus() {
      var params = new URLSearchParams();
      //   params.append("tahun", 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/order/deals/status', request)

        .then(response => {
          let { data } = response.data;
          this.DealStatus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    }
  },
  computed: {},
  created() {
    // this.GetTransaksi();
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
