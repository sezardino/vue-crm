import { Tooltip } from "materialize-css";

const tooltips = [];

const tooltipDirective = {
  mounted(el, binding) {
    Tooltip.init(el, { html: binding.value });
  },
  beforeUnmount(el) {
    const tooltip = Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};

export default tooltipDirective;
