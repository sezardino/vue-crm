import { FormSelect } from "materialize-css";

const selectMixin = {
  data() {
    return {
      select: null,
    };
  },

  methods: {
    createSelect() {
      this.select = new FormSelect(this.$refs.select);
    },
    destroySelect() {
      this.select.destroy();
      this.select = null;
    },
  },

  mounted() {
    if (this.$refs.select) {
      setTimeout(() => this.createSelect(), 0);
    }
  },

  beforeUnmount() {
    if (this.select) {
      this.destroySelect();
    }
  },
};

export default selectMixin;
