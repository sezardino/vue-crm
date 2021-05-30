<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home finance</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: validate.email }"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="validate.email">{{
          validate.email
        }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: validate.password }"
        />
        <label for="password">Pasword</label>
        <small class="helper-text invalid" v-if="validate.password">{{
          validate.password
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Login
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Dont have account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      validate: { email: "", password: "" },
    };
  },
  methods: {
    submitHandler() {
      if (!this.isValid()) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };
      console.log(formData);

      this.email = "";
      this.password = "";
    },
    isValid() {
      let isValid = true;
      const emailReg =
        /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      this.validate.email = "";
      this.validate.password = "";
      if (this.email.length === 0) {
        this.validate.email = "You should enter your email";
        isValid = false;
      } else if (!emailReg.test(this.email)) {
        this.validate.email = "You should enter valid email";
      }
      if (this.password.length === 0) {
        this.validate.password = "You should enter your password";
        isValid = false;
      } else if (this.password.length < 6) {
        this.validate.password = "Password is too short";
        isValid = false;
      }
      return isValid;
    },
  },
});
</script>
