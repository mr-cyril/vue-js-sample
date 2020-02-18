<template>
  <Modal :open="open" @close="close" @show="show" @hide="hide">
    <form id="signup" @submit.prevent="submit">
      <div class="form-group">
        <label for="signup_name">Name</label>
        <input
          id="signup_name"
          class="form-control"
          type="text"
          name="name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="signup_login">Login</label>
        <input
          id="signup_login"
          class="form-control"
          type="text"
          name="login"
          v-model="login"
        />
      </div>
      <div class="form-group">
        <label for="signup_password">Password</label>
        <input
          id="signup_password"
          class="form-control"
          type="password"
          name="password"
          v-model="password"
        />
      </div>
    </form>
    <slot></slot>
    <template v-slot:footer>
      <button
        type="submit"
        class="btn btn-primary btn-sm"
        form="signup"
        :disabled="!isComplete"
      >
        Регистрация
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        data-dismiss="modal"
        @click="close"
      >
        Close
      </button>
    </template>
  </Modal>
</template>

<script>
import Vue from "vue";
import _ from "lodash";

import Modal from "@/components/Modal.vue";
import modalMixin from "@/mixins/modalMixin";

export default Vue.extend({
  name: "ModalSignUp",

  mixins: [modalMixin],

  components: {
    Modal
  },

  data() {
    return {
      name: "",
      login: "",
      password: ""
    };
  },

  computed: {
    isComplete() {
      return this.name && this.login && this.password;
    }
  },

  methods: {
    reset() {
      this.name = "";
      this.login = "";
      this.password = "";
    },

    submit() {
      const name = this.name;
      const login = this.login;
      const password = this.password;

      this.$emit("submit", { name, login, password });
    }
  }
});
</script>

<style scoped lang="scss"></style>
