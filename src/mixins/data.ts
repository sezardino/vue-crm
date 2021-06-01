interface IFormatOptions {
  day?: "2-digit" | "numeric";
  month?: "2-digit" | "numeric" | "long" | "short" | "narrow";
  year?: "2-digit" | "numeric";
  hour?: "2-digit" | "numeric";
  minute?: "2-digit" | "numeric";
  second?: "2-digit" | "numeric";
}

const dataMixin = {
  methods: {
    formatDate(value, format = "date"): string {
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
    },
  },
};

export default dataMixin;
