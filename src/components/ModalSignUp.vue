<template>
  <Modal :open="open" @close="close" @show="show" @hide="hide">
    <form id="signup" @submit.prevent="submit">
      <input type="text" name="name" v-model="name" /> |
      <input type="text" name="login" v-model="login" /> |
      <input type="password" name="password" v-model="password" /> |
    </form>
    <slot></slot>
    <template v-slot:footer>
      <button type="submit" class="btn btn-primary" form="signup">
        Регистрация
      </button>
      <button
        type="button"
        class="btn btn-secondary"
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

  methods: {
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
