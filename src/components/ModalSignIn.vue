<template>
  <Modal :open="open" @close="close" @show="show" @hide="hide">
    <form id="signin" @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group col-6">
          <label for="signin_login">Login</label>
          <input
            id="signin_login"
            class="form-control"
            type="text"
            name="login"
            v-model="login"
          />
        </div>
        <div class="form-group col-6">
          <label id="signin_password" for="signin_password">Password</label>
          <input
            class="form-control"
            type="password"
            name="password"
            v-model="password"
          />
        </div>
      </div>
    </form>
    <slot></slot>
    <template v-slot:footer>
      <button
        type="submit"
        class="btn btn-primary btn-sm"
        form="signin"
        :disabled="!isComplete"
      >
        Войти
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
  name: "ModalSignIn",

  mixins: [modalMixin],

  components: {
    Modal
  },

  data() {
    return {
      login: "",
      password: ""
    };
  },

  computed: {
    isComplete() {
      return this.login && this.password;
    }
  },

  methods: {
    reset() {
      this.login = "";
      this.password = "";
    },

    submit() {
      const login = this.login;
      const password = this.password;

      this.$emit("submit", { login, password });
    }
  }
});
</script>

<style scoped lang="scss"></style>
