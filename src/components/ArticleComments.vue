<template>
  <FadeTransition
    group
    tag="ul"
    class="list-group list-group-flush"
    :duration="500"
  >
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="list-group-item flex-column align-items-start"
    >
      <div class="d-flex w-100 mb-1 justify-content-between">
        <small>
          <strong>{{ comment.user.name }}</strong>
        </small>
        <small v-if="comment.datetime" class="text-muted">{{
          comment.datetime | moment
        }}</small>
      </div>
      <span>{{ comment.text }}</span>
    </li>
  </FadeTransition>
</template>

<script>
import Vue from "vue";
import _ from "lodash";

import FadeTransition from "@/components/FadeTransition.vue";
import momentFilter from "@/filters/momentFilter";

export default Vue.extend({
  name: "ArticleComments",

  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },

  components: {
    FadeTransition
  },

  filters: {
    moment: momentFilter
  }
});
</script>
