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
          class="validate"
          name="password"
          v-model.trim="formData.password"
          :class="{ invalid: validate.password }"
        />
        <label for="password">Pasword</label>
        <small class="helper-text invalid" v-if="validate.password">{{
          validate.password
        }}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          name="name"
          v-model.trim="formData.name"
          :class="{ invalid: validate.name }"
        />
        <label for="name">Name</label>
        <small class="helper-text invalid" v-if="validate.name">{{
          validate.name
        }}</small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            name="agree"
            v-model="formData.agree"
            :class="{ invalid: validate.agree }"
          />
          <span>Agree with</span>
        </label>
        <small class="helper-text invalid" v-if="validate.agree">
          - {{ validate.agree }}</small
        >
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Register
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Have account?
        <router-link to="/login">Enter!</router-link>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import messages from "@/utils/messages";
import { defineComponent } from "vue";
import formMixin from "../mixins/form";

export default defineComponent({
  mixins: [formMixin],
  data() {
    return { formData: {} };
  },
  methods: {
    async submitHandler(evt: Event) {
      const isValid = this.checkValid(evt.target);

      if (!isValid) {
        return;
      }

      try {
        await this.$store.dispatch("register", this.formData);
        this.formData = {};
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.$error(messages[error.code] || "Some Error");
      }
    },
  },
});
</script>
