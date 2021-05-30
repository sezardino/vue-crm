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

    checkEmail(value: string) {
      let isValid = true;
      const emailReg =
        /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

      if (value.length === 0) {
        this.validate.email = "You should enter your email";
        isValid = false;
      }
      if (!emailReg.test(value)) {
        this.validate.email = "You should enter valid email";
        isValid = false;
      }

      return isValid;
    },

    checkPassword(value: string) {
      let isValid = true;
      if (value.length === 0) {
        this.validate.password = "You should enter your password";
        isValid = false;
      } else if (value.length < 6) {
        this.validate.password = "Password is too short";
        isValid = false;
      }

      return isValid;
    },

    checkName(value: string) {
      let isValid = true;
      const nameReg = /^[a-zA-Z ]+$/;

      if (!nameReg.test(value)) {
        isValid = false;
        this.validate.name = "Invalid Name";
      } else if (value.length < 3) {
        this.validate.name = "Name is too short";
      }
      return isValid;
    },

    checkAgree(input: HTMLInputElement) {
      let isValid = true;

      if (!input.checked) {
        isValid = false;
        this.validate.agree = "You should agree with us";
      }
      return isValid;
    },

    checkValid(form: HTMLFormElement) {
      const inputs = Array.from(form.querySelectorAll("input"));
      this.clearValidateMessage();

      const check = inputs.map((input) => {
        let isValid = true;

        if (input.name === "email") {
          isValid = this.checkEmail(input.value);
        } else if (input.name === "password") {
          isValid = this.checkPassword(input.value);
        } else if (input.name === "name") {
          isValid = this.checkName(input.value);
        } else if (input.name === "agree") {
          isValid = this.checkAgree(input);
        }
        return isValid;
      });

      return !check.includes(false);
    },
  },
};
