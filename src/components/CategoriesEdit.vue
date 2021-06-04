<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select name="category" ref="select" v-model="currentCategory">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <label>Choose Category</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="edit-name"
            name="name"
            v-model="formData.name"
            :class="{ invalid: validate.name }"
          />
          <label for="edit-name">Name</label>
          <span class="helper-text invalid" v-if="validate.name">{{
            validate.name
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="edit-limit"
            type="number"
            name="limit"
            min="1"
            v-model="formData.limit"
            :class="{ invalid: validate.limit }"
          />
          <label for="edit-limit">Limit</label>
          <span class="helper-text invalid" v-if="validate.limit">{{
            validate.limit
          }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { updateTextFields } from "materialize-css";
import formMixin from "@/mixins/form";
import selectMixin from "@/mixins/select";
import messages from "@/utils/messages";

export default defineComponent({
  props: ["categories"],
  emits: ["updateCategory"],
  mixins: [formMixin, selectMixin],
  data() {
    return {
      formData: {},
      currentCategory: null,
      select: null,
    };
  },
  methods: {
    async submitHandler(evt) {
      const isValid = this.checkValid(evt.target);

      if (!isValid) {
        return;
      }
      const newCategory = {
        id: this.current,
        ...this.formData,
      };
      await this.$store.dispatch("updateCategory", newCategory);
      this.$message(messages.categoryUpdate);
      this.$emit("updateCategory", newCategory);
    },

    changeCategory() {
      const { name, limit } = this.categories.find(
        (category) => category.id === this.currentCategory
      );
      this.formData.name = name;
      this.formData.limit = limit;
    },
  },

  mounted() {
    this.currentCategory = this.categories[0].id;
    this.changeCategory();
  },

  watch: {
    currentCategory() {
      this.changeCategory();
    },
  },

  updated() {
    updateTextFields();
  },
});
</script>
