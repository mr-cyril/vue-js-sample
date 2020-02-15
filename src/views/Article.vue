<template>
  <div class="article">
    <h1>This is an article page</h1>
    <template v-if="detail">
      <h2>{{ detail.name }}</h2>
      <div>{{ detail.text }}</div>
    </template>
    <template v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id">
        <span>{{ comment.datetime }}</span> | <span>{{ comment.text }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default Vue.extend({
  name: "Article",

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      detail: "article/detail",
      comments: "article/comments"
    })
  },

  methods: {},

  beforeRouteEnter(to, from, next) {
    next(async vm => await vm.$store.dispatch("article/fetchDetail"));
  }
});
</script>
