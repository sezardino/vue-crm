interface IFormatOptions {
  day?: "2-digit" | "numeric";
  month?: "2-digit" | "numeric" | "long" | "short" | "narrow";
  year?: "2-digit" | "numeric";
  hour?: "2-digit" | "numeric";
  minute?: "2-digit" | "numeric";
  second?: "2-digit" | "numeric";
}

const formatTime = (value, format) => {
  const options: IFormatOptions = {};
  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
  }

  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  return new Intl.DateTimeFormat("pl-Pl", options).format(new Date(value));
};

const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(value);
};

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
