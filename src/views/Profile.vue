<template>
  <div>
    <div class="page-title">
      <h3>Profile</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          name="name"
          v-model="name"
          :class="{ invalid: validate.name }"
        />
        <label for="description">Name</label>
        <span class="helper-text" :class="{ invalid: validate.name }">{{
          validate.name
        }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Refresh
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { updateTextFields } from "materialize-css";
import formMixin from "../mixins/form";
import messages from "@/utils/messages";

export default defineComponent({
  mixins: [formMixin],
  data() {
    return { name: "" };
  },
  methods: {
    async submitHandler(evt) {
      const isValid = this.checkValid(evt.target);

      if (!isValid) {
        return;
      }

      try {
        const result = await this.$store.dispatch("updateInfo", {
          name: this.name,
        });

        if (result) {
          this.$message(messages.profileNameUpdate);
          this.name = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
