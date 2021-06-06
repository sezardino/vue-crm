<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      The are no records.
      <router-link to="/record">Create new record</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script lang="ts">
import HistoryTable from "@/components/HistoryTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { HistoryTable },
  data() {
    return { loading: true, categories: [], records: [] };
  },
  async mounted() {
    const records = await this.$store.dispatch("getRecords");
    this.categories = await this.$store.dispatch("getCategories");
    this.records = records.map((record) => {
      return {
        ...record,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Income" : "Outcome",
        category: this.categories.find(
          (category) => (category.id = record.categoryId)
        ).name,
      };
    });

    this.loading = false;
  },
});
</script>
