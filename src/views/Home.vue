<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <div>
      <template v-if="!isAuthorized">
        <button type="button">Регистрация</button>
        <button type="button" v-on:click="openModal">Авторизация</button>
      </template>
      <template v-else>
        <span>Admin</span>
      </template>
    </div>

    <template v-if="showModal">
      <div>
        <input type="text" name="login" v-model="login" /> |
        <input type="password" name="password" v-model="password" /> |
        <button v-on:click="doSignin">Войти</button>
      </div>
    </template>

    <Modal :open.sync="showModal" />
    <ModalBackdrop :open="showModal" />
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

import HelloWorld from "@/components/HelloWorld.vue";
import Modal from "@/components/Modal.vue";
import ModalBackdrop from "@/components/ModalBackdrop.vue";

export default Vue.extend({
  name: "Home",

  components: {
    HelloWorld,
    Modal,
    ModalBackdrop
  },

  data() {
    return {
      login: "",
      password: "",
      showModal: false
    };
  },

  computed: {
    ...mapGetters({
      isAuthorized: "auth/isAuthorized"
    })
  },

  methods: {
    ...mapActions({
      signin: "auth/signin"
    }),
    openModal() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    async doSignin() {
      const login = this.login;
      const password = this.password;
      await this.signin({ login, password });
      this.hideModal();
    }
  }
});
</script>
