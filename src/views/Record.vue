<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>
    <Loader v-if="loading" />

    <p v-else-if="!categories.length">
      The are no categories,
      <router-link to="categories">Create new category</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
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
        <label>Choose category</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            v-model="formData.type"
            name="type"
            type="radio"
            value="income"
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            v-model="formData.type"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          name="amount"
          v-model.number="formData.amount"
          :class="{ invalid: validate.amount }"
        />
        <label for="amount">Amount</label>
        <span class="helper-text invalid" v-if="validate.amount">{{
          validate.amount
        }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          name="description"
          v-model="formData.description"
          :class="{ invalid: validate.description }"
        />
        <label for="description">Description</label>
        <span class="helper-text invalid" v-if="validate.description">{{
          validate.description
        }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import selectMixin from "@/mixins/select";
import form from "@/mixins/form";
import messages from "@/utils/messages";
export default defineComponent({
  mixins: [selectMixin, form],
  data() {
    return {
      loading: true,
      categories: [],
      currentCategory: null,
      formData: { type: "income" },
    };
  },

  computed: {
    canCreateRecord() {
      const { type, amount } = this.formData;
      if (type === "income") {
        return true;
      }

      if (this.$store.getters.info.bill - amount < 0) {
        return false;
      }

      return true;
    },
  },

  methods: {
    async submitHandler(evt) {
      const isValid = this.checkValid(evt.target);

      if (!isValid) {
        return;
      }

      const { type, amount, description } = this.formData;
      const bill = this.$store.getters.info.bill;

      if (!this.canCreateRecord) {
        this.$error(messages.recordNotEnough((bill - amount) * -1));
        return;
      }

      await this.$store.dispatch("createRecord", {
        categoryId: this.currentCategory,
        type: type,
        amount: amount,
        description: description,
        date: new Date().toJSON(),
      });

      let newBill = type === "income" ? bill + amount : bill - amount;

      await this.$store.dispatch("updateInfo", { bill: newBill });
      this.$message(messages.recordAdd);
      this.formData = { type: "income" };
    },
  },

  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");
    if (this.categories.length) {
      this.currentCategory = this.categories[0].id;
    }
    this.loading = false;
    setTimeout(() => {
      this.createSelect();
    }, 0);
  },
});
</script>
