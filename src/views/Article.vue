<template>
  <div class="article p-3">
    <template v-if="detail">
      <div class="w-75 mx-auto mb-3">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title" v-html="detail.name" />
            <div class="card-text" v-html="detail.text" />
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="isLoading">
      <div class="d-flex justify-content-center mb-3">
        <Spinner tagName="div" color="primary" />
      </div>
    </template>

    <template v-if="comments.length">
      <div class="w-50 p-3 mx-auto mb-3">
        <ArticleComments :comments="comments" />
      </div>
    </template>
    <template v-else-if="isLoading">
      <div class="d-flex justify-content-center mb-3">
        <Spinner tagName="div" color="primary" />
      </div>
    </template>

    <template v-if="detail && isAuthorized">
      <div class="w-50 mx-auto">
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
import ArticleComments from "@/components/ArticleComments.vue";

export default Vue.extend({
  name: "Article",

  components: {
    Spinner,
    FormComment,
    ArticleComments
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
