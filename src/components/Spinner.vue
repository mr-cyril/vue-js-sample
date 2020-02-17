<template>
  <component
    :is="tagName"
    :class="className"
    role="status"
    aria-hidden="true"
  />
</template>

<script>
import Vue from "vue";
import _ from "lodash";

export default Vue.extend({
  name: "Spinner",

  props: {
    type: {
      type: String,
      default: "border"
    },
    color: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    tagName: {
      type: String,
      default: "div",
      required: true
    }
  },

  data() {
    return {};
  },

  computed: {
    className() {
      const classes = [];

      if (this.type && _.includes(["border", "grow"], this.type)) {
        classes.push(`spinner-${this.type}`);

        if (this.size && _.includes(["sm"], this.size))
          classes.push(`spinner-${this.type}-${this.size}`);
      }

      if (this.color) classes.push(`text-${this.color}`);

      return classes;
    }
  }
});
</script>
