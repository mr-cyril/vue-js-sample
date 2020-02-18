<template>
  <transition name="fade" mode="out-in">
    <form v-if="isFormActive" id="comment" @submit.prevent="submit">
      <div class="form-group">
        <textarea
          id="comment_text"
          class="form-control"
          name="text"
          v-model="text"
        ></textarea>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-primary btn-sm" type="submit">
          Add comment
        </button>
      </div>
    </form>
    <div v-else class="d-flex justify-content-center">
      <button
        class="btn btn-outline-secondary btn-sm"
        type="button"
        @click="toggleFormActive"
      >
        Add comment
      </button>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import _ from "lodash";

export default Vue.extend({
  name: "FormComment",

  props: {
    articleId: { type: Number, required: true },
    userId: { type: Number, required: true }
  },

  data() {
    return {
      isFormActive: false,
      text: ""
    };
  },

  methods: {
    toggleFormActive() {
      this.isFormActive = !this.isFormActive;
    },

    reset() {
      this.text = "";
    },

    submit() {
      const articleId = this.articleId;
      const userId = this.userId;
      const datetime = moment().toISOString(false);
      const text = this.text;

      this.$emit("submit", { articleId, userId, datetime, text });
      this.toggleFormActive();
    }
  }
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
