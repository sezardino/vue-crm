<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            name="name"
            v-model="formData.name"
            :class="{ invalid: !!validate.name }"
          />
          <label for="name">Name</label>
          <span class="helper-text invalid" v-if="validate.name">{{
            validate.name
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            name="limit"
            min="1"
            v-model="formData.limit"
            :class="{ invalid: !!validate.limit }"
          />
          <label for="limit">Limit</label>
          <span class="helper-text invalid" v-if="validate.limit">{{
            validate.limit
          }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { updateTextFields } from "materialize-css";
import formMixin from "../mixins/form";

export default defineComponent({
  mixins: [formMixin],
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    submitHandler(evt) {
      const isValid = this.checkValid(evt.target);

      if (!isValid) {
        return;
      }
      console.log(1);
    },
  },
});
</script>
