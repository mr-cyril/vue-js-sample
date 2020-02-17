const modalMixin = {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },

    show() {
      this.$emit("show");
    },

    hide() {
      this.$emit("hide");
    }
  }
};

export { modalMixin as default };
