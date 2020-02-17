<template>
  <Modal :open="open" @close="close" @show="show" @hide="hide">
    <form id="signin" @submit.prevent="submit">
      <input type="text" name="login" v-model="login" /> |
      <input type="password" name="password" v-model="password" /> |
    </form>
    <slot></slot>
    <template v-slot:footer>
      <button type="submit" class="btn btn-primary btn-sm" form="signin">
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

  methods: {
    submit() {
      const login = this.login;
      const password = this.password;
      this.$emit("submit", { login, password });
    }
  }
});
</script>

<style scoped lang="scss"></style>
