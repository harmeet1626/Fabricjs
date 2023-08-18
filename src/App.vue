<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
        <h2>Editing app</h2>||
        <RouterLink to="/" style="color: aliceblue;">
          Home
        </RouterLink>||

        <RouterLink to="/about" style="color: aliceblue;">
          About
        </RouterLink>||
      </div>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink } from 'vue-router';


export default {
  name: "App",
  data: () => ({
    //
  }),
  components: { RouterLink }
};
</script>
