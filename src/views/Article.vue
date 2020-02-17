<template>
  <div class="article">
    <h1>This is an article page</h1>

    <template v-if="detail">
      <h2>{{ detail.name }}</h2>
      <div>{{ detail.text }}</div>
    </template>
    <template v-else-if="isLoading">
      <div class="d-flex justify-content-center">
        <Spinner tagName="div" color="primary" />
      </div>
    </template>

    <template v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id">
        <span>{{ comment.user.name }}</span> |
        <span>{{ comment.datetime | moment }}</span> |
        <span>{{ comment.text }}</span>
      </div>
    </template>
    <template v-else-if="isLoading">
      <div class="d-flex justify-content-center">
        <Spinner tagName="div" color="primary" />
      </div>
    </template>

    <template v-if="isAuthorized">
      <div>
        <textarea></textarea>
      </div>
    </template>
    <button class="btn btn-outline-secondary btn-sm" type="button">
      Добавить комментарий
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

import Spinner from "@/components/Spinner.vue";
import momentFilter from "@/filters/momentFilter";

export default Vue.extend({
  name: "Article",

  components: {
    Spinner
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

  methods: {},

  beforeRouteEnter(to, from, next) {
    next(async vm => await vm.$store.dispatch("article/fetchDetail"));
  }
});
</script>
