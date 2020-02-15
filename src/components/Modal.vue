<template>
  <div
    class="modal fade"
    :class="classModal"
    :style="styleModal"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
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
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
          <p>Modal body text goes here.</p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save</button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default Vue.extend({
  name: "Modal",

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

  methods: {
    close() {
      this.$emit("update:open", false);
    }
  },

  watch: {
    open: {
      handler(open) {
        if (this.openHandle) clearTimeout(this.openHandle);
        if (open) {
          document.body.classList.add("modal-open");
          this.$set(this.styleModal, "display", "block");
          this.openHandle = setTimeout(
            () => this.$set(this.classModal, "show", true),
            300
          );
        } else {
          document.body.classList.remove("modal-open");
          this.$set(this.classModal, "show", false);
          this.openHandle = setTimeout(
            () => this.$set(this.styleModal, "display", "none"),
            300
          );
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
