<template>
  <div id="app">
    <ul class="nav nav-tabs justify-content-center pt-3">
      <li class="nav-item">
        <router-link to="/" exact v-slot="{ href, navigate, isActive }">
          <a
            class="nav-link"
            :class="{ active: isActive }"
            :active="isActive"
            :href="href"
            @click="navigate"
            >Home</a
          >
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/article" v-slot="{ href, navigate, isActive }">
          <a
            class="nav-link"
            :class="{ active: isActive }"
            :active="isActive"
            :href="href"
            @click="navigate"
            >Article</a
          >
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import _ from "lodash";

export default Vue.extend({
  name: "App",

  mounted() {
    _.attempt(async () => {
      if (this.$store.getters["auth/isAuthenticated"]) {
        await this.$store.dispatch("auth/fetchUserInfo");
      }
    });
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
