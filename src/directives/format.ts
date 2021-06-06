import { formatCurrency, formatTime } from "@/utils/formatting";

const formatDirective = {
  mounted(el, binding) {
    const {
      arg,
      value,
      modifiers: { date, currency },
    } = binding;

    if (date) {
      el.textContent = formatTime(value, arg);
    } else if (currency) {
      el.textContent = formatCurrency(value, arg);
    }
  },
  beforeUpdate(el, binding) {
    const {
      arg,
      value,
      modifiers: { date, currency },
    } = binding;
    if (date) {
      el.textContent = formatTime(value, arg);
    } else if (currency) {
      el.textContent = formatCurrency(value, arg);
    }
  },
};

export default formatDirective;
