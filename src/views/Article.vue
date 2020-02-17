<template>
  <div class="article">
    <template v-if="detail">
      <h1>{{ detail.name }}</h1>
      <div>{{ detail.text }}</div>
    </template>
    <template v-else-if="isLoading">
      <div class="d-flex justify-content-center">
        <Spinner tagName="div" color="primary" />
      </div>
    </template>

    <template v-if="comments.length">
      <div class="w-50 p-3 mx-auto">
        <FadeTransition group tag="ul" class="list-group" :duration="300">
          <li
            v-for="comment in comments"
            :key="comment.id"
            class="list-group-item"
          >
            <span v-if="comment.datetime">{{ comment.datetime | moment }}</span>
            | <span>{{ comment.user.name }}</span> |
            <span>{{ comment.text }}</span>
          </li>
        </FadeTransition>
      </div>
    </template>
    <template v-else-if="isLoading">
      <div class="d-flex justify-content-center">
        <Spinner tagName="div" color="primary" />
      </div>
    </template>

    <template v-if="detail && isAuthorized">
      <div class="w-50 p-3 mx-auto">
        <FormComment
          ref="form"
          :articleId="detail.id"
          :userId="userId"
          @submit="onSubmit"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

import Spinner from "@/components/Spinner.vue";
import FormComment from "@/components/FormComment.vue";
import FadeTransition from "@/components/FadeTransition.vue";
import momentFilter from "@/filters/momentFilter";

export default Vue.extend({
  name: "Article",

  components: {
    Spinner,
    FormComment,
    FadeTransition
  },

  filters: {
    moment: momentFilter
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      isAuthorized: "auth/isAuthorized",
      userId: "auth/userId",

      detail: "article/detail",
      comments: "article/comments",
      isLoading: "article/isLoading"
    })
  },

  methods: {
    ...mapActions({
      createComment: "article/createComment"
    }),

    async onSubmit(...args) {
      await this.createComment(...args);
      console.log("createComment", ...args);
      await this.$nextTick();
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next(async vm => await vm.$store.dispatch("article/fetchDetail"));
  }
});
</script>

<style scoped lang="scss"></style>
