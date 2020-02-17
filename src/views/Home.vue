<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div>
      <template v-if="!isAuthenticated">
        <button
          class="btn btn-outline-primary btn-sm"
          type="button"
          @click="openModal(modalType.signup)"
        >
          Регистрация
        </button>
        |
        <button
          class="btn btn-primary btn-sm"
          type="button"
          @click="openModal(modalType.signin)"
        >
          Авторизация
        </button>
      </template>
      <template v-else-if="isAuthorized">
        <span>{{ user.name }}</span> |
        <button class="btn btn-primary btn-sm" type="button" @click="signout">
          Выход
        </button>
      </template>
      <template v-else-if="isLoading">
        <div class="d-flex justify-content-center">
          <Spinner tagName="div" color="primary" />
        </div>
      </template>
    </div>

    <component
      ref="form"
      :is="selectedModalComponent"
      :open="showModal"
      @hide="unselectFormComponent"
      @close="closeModal"
      @submit="onSubmit"
    />
    <ModalBackdrop v-if="selectedModalComponent" :open="showModal" />
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

import ModalSignIn from "@/components/ModalSignIn.vue";
import ModalSignUp from "@/components/ModalSignUp.vue";
import ModalBackdrop from "@/components/ModalBackdrop.vue";
import Spinner from "@/components/Spinner.vue";

const modalType = Object.freeze({
  signin: "signin",
  signup: "signup"
});

export default Vue.extend({
  name: "Home",

  components: {
    ModalSignIn,
    ModalSignUp,
    ModalBackdrop,
    Spinner
  },

  data() {
    return {
      modalType,
      showModal: false,
      selectedModalComponent: undefined
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      isAuthorized: "auth/isAuthorized",
      isLoading: "auth/isLoading",
      user: "auth/user"
    })
  },

  methods: {
    ...mapActions({
      signin: "auth/signin",
      signup: "auth/signup",
      signout: "auth/signout"
    }),

    openModal(type) {
      switch (type) {
        case modalType.signin:
          this.selectedModalComponent = this.$options.components.ModalSignIn;
          this.showModal = true;
          break;
        case modalType.signup:
          this.selectedModalComponent = this.$options.components.ModalSignUp;
          this.showModal = true;
          break;
        default:
          this.selectedModalComponent = undefined;
          this.showModal = false;
          break;
      }
    },

    closeModal() {
      this.showModal = false;
    },

    unselectFormComponent() {
      this.selectedModalComponent = undefined;
    },

    async onSubmit(...args) {
      switch (this.selectedModalComponent) {
        case this.$options.components.ModalSignIn:
          console.log("signin", ...args);
          if (await this.signin(...args)) {
            this.showModal = false;

            await this.$nextTick();
            if (this.$refs.form) {
              this.$refs.form.reset();
            }
          }
          break;
        case this.$options.components.ModalSignUp:
          console.log("signup", ...args);
          if (await this.signup(...args)) {
            this.showModal = false;

            await this.$nextTick();
            if (this.$refs.form) {
              this.$refs.form.reset();
            }
          }
          break;
        default:
          break;
      }
    }
  }
});
</script>
