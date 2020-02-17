<template>
  <div
    class="modal fade"
    :class="className"
    :style="style"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="!!$slots.title" class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div v-if="!!$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "lodash";

import modalMixin from "@/mixins/modalMixin";

export default Vue.extend({
  name: "Modal",

  mixins: [modalMixin],

  data() {
    return {
      openHandle: undefined,
      className: { show: false },
      style: { display: "none" }
    };
  },

  watch: {
    open: {
      handler(open) {
        if (this.openHandle) clearTimeout(this.openHandle);
        if (open) {
          document.body.classList.add("modal-open");
          this.$set(this.style, "display", "block");
          this.openHandle = setTimeout(() => {
            this.$set(this.className, "show", true);
            this.show();
          }, 300);
        } else {
          document.body.classList.remove("modal-open");
          this.$set(this.className, "show", false);
          this.openHandle = setTimeout(() => {
            this.$set(this.style, "display", "none");
            this.hide();
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
