<template>
  <div class="modal-backdrop fade" :class="classModal" :style="styleModal" />
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default Vue.extend({
  name: "ModalBackdrop",

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      openHandle: undefined,
      classModal: { show: false },
      styleModal: { display: "none" }
    };
  },

  computed: {},

  methods: {},

  watch: {
    open: {
      handler(open) {
        if (this.openHandle) clearTimeout(this.openHandle);
        if (open) {
          this.$set(this.styleModal, "display", "block");
          this.openHandle = setTimeout(
            () => this.$set(this.classModal, "show", true),
            200
          );
        } else {
          this.openHandle = setTimeout(() => {
            this.$set(this.classModal, "show", false);
            this.openHandle = setTimeout(
              () => this.$set(this.styleModal, "display", "none"),
              100
            );
          }, 300);
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.$nextTick(() => document.body.appendChild(this.$el));
  },

  beforeDestroy() {
    if (this.openHandle) clearTimeout(this.openHandle);
    this.$el.remove();
  }
});
</script>

<style scoped lang="scss"></style>
