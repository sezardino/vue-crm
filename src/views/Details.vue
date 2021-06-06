<template>
  <div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!record">
      Record with this id are not exist.
      <router-link to="/history">Back to History</router-link>
    </p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb"> {{ record.breadcrumbsText }} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div :class="[record.color]" class="card">
            <div class="card-content white-text">
              <p>Description: {{ record.description }}</p>
              <p>Amount: <span v-format.currency="record.amount"></span></p>
              <p>Category: {{ record.category }}</p>

              <small v-format:datetime.date="record.date"></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Details",
  data() {
    return { loading: true, record: null, category: null };
  },
  async mounted() {
    const recordId = this.$route.params.id;
    const record = await this.$store.dispatch("getRecordById", recordId);
    const category = await this.$store.dispatch(
      "getCategoryById",
      record.categoryId
    );
    console.log(category);
    this.record = {
      ...record,
      category: category.name,
      breadcrumbsText: record.type === "income" ? "Income" : "Outcome",
      color: record.type === "income" ? "green" : "red",
    };

    this.loading = false;
  },
});
</script>
