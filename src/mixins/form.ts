const validateMessages = {
  email: {
    empty: "You should enter your email",
    invalid: "You should enter valid email",
  },
  limit: {
    min: (min) => `Minimal limit is ${min}`,
    max: (max) => `Maximal limit is ${max}`,
  },
  password: {
    empty: "You should enter your password",
    short: "Password is too short",
  },
  name: { invalid: "Invalid Name", short: "Name is too short" },
  agree: { disagree: "You should agree with us" },
  amount: { zero: "Amount should be higher of lower then 0" },
  description: { empty: "Description shouldn't be empty" },
};

export default {
  data() {
    return {
      validate: {},
    };
  },
  methods: {
    clearValidateMessage() {
      this.validate = {};
    },

    checkAmount(input: HTMLInputElement) {
      let isValid = true;
      const value = +input.value;

      if (value === 0) {
        this.validate.amount = validateMessages.amount.zero;
        isValid = false;
      }

      return isValid;
    },

    checkDescription(input: HTMLInputElement) {
      let isValid = true;
      const value = input.value;

      if (value.length === 0) {
        this.validate.description = validateMessages.description.empty;
        isValid = false;
      }

      return isValid;
    },

    checkLimit(input: HTMLInputElement) {
      let isValid = true;
      const value = +input.value;
      const min = +input.min;
      if (value < min) {
        this.validate.limit = validateMessages.limit.min(min);
        isValid = false;
      }

      return isValid;
    },

    checkEmail(value: string) {
      let isValid = true;
      const emailReg =
        /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

      if (value.length === 0) {
        this.validate.email = validateMessages.email.empty;
        isValid = false;
      }
      if (!emailReg.test(value)) {
        this.validate.email = validateMessages.email.invalid;
        isValid = false;
      }

      return isValid;
    },

    checkPassword(value: string) {
      let isValid = true;
      if (value.length === 0) {
        this.validate.password = validateMessages.password.empty;
        isValid = false;
      } else if (value.length < 6) {
        this.validate.password = validateMessages.password.short;
        isValid = false;
      }

      return isValid;
    },

    checkName(value: string) {
      let isValid = true;
      const nameReg = /^[a-zA-Z ]+$/;

      if (!nameReg.test(value)) {
        isValid = false;
        this.validate.name = validateMessages.name.invalid;
      } else if (value.length < 3) {
        isValid = false;
        this.validate.name = validateMessages.name.short;
      }
      return isValid;
    },

    checkAgree(input: HTMLInputElement) {
      let isValid = true;

      if (!input.checked) {
        isValid = false;
        this.validate.agree = validateMessages.agree.disagree;
      }
      return isValid;
    },

    checkValid(form: HTMLFormElement) {
      const inputs = Array.from(form.querySelectorAll("input"));
      this.clearValidateMessage();

      const check = inputs.map((input) => {
        let isValid = true;
        const name = input.name;
        switch (name) {
          case "email":
            isValid = this.checkEmail(input.value);
            break;
          case "password":
            isValid = this.checkPassword(input.value);
            break;
          case "name":
            isValid = this.checkName(input.value);
            break;
          case "agree":
            isValid = this.checkAgree(input);
            break;
          case "limit":
            isValid = this.checkLimit(input);
            break;
          case "amount":
            isValid = this.checkAmount(input);
            break;
          case "description":
            isValid = this.checkDescription(input);
            break;
        }

        return isValid;
      });
      return !check.includes(false);
    },
  },
};
