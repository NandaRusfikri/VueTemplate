<template>
  <v-app>
    <v-snackbar v-model="snackbar" :color="color.snackbar" top="top">
      {{ message }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-row fill-height align="center" justify="center" style="margin:0">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar>
            <v-toolbar-title align="center" justify="center"
              >Login
            </v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/pMvGQO"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="Email"
                v-model="email"
                prepend-icon="email"
                type="text"
              />

              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn outlined @click="Login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      email: null,
      password: null,
      color: { snackbar: '' },
      snackbar: false,
      message: null
    };
  },
  methods: {
    async Login() {
      const resp = await this.$axios
        .post('api/login', {
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });

      if (resp.status == 200) {
        window.sessionStorage.setItem('user', this.email);
        window.sessionStorage.setItem('token', resp.data.token);

        this.$store.commit('SET_USER', this.email);
        this.$store.commit('SET_TOKEN', resp.data.token);
        this.$router.push(resp.redirect ? resp.redirect : '/dashboard');
      } else {
        this.snackbar = true;
        this.color.snackbar = 'error';
        this.message = resp.data.error;
      }
    }
  }
};
</script>
s
