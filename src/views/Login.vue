<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home finance</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          name="email"
          v-model.trim="formData.email"
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
          name="password"
          v-model.trim="formData.password"
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
import formMixin from "../mixins/form";

export default defineComponent({
  name: "Login",
  mixins: [formMixin],
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    submitHandler(evt: Event) {
      const isValid = this.checkValid(evt.target);

      if (!isValid) {
        return;
      }

      console.log(this.formData);
      this.$router.push("/");
      this.formData = {};
    },
  },
});
</script>
