import { FormSelect } from "materialize-css";

const selectMixin = {
  data() {
    return {
      select: null,
    };
  },

  methods: {
    destroySelect() {
      this.select.destroy();
      this.select = null;
    },
  },

  mounted() {
    setTimeout(() => (this.select = new FormSelect(this.$refs.select)), 0);
  },

  beforeUnmount() {
    console.log(1);
    this.destroySelect();
  },
};

export default selectMixin;
