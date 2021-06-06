<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!currentItems.length">
      The are no records.
      <router-link to="/record">Create new record</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="currentItems" />

      <Paginate :total-pages="totalPages" :current-page="currentPage" />
    </section>
  </div>
</template>

<script lang="ts">
import HistoryTable from "@/components/HistoryTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { HistoryTable },
  data() {
    return {
      loading: true,
      items: [],
      itemsPerPage: 3,
    };
  },
  methods: {
    updatePage() {
      this.currentPage = this.$route.params.page;
    },
  },
  async mounted() {
    const records = await this.$store.dispatch("getRecords");
    const categories = await this.$store.dispatch("getCategories");
    this.totalPages = Math.round(records.length / this.itemsPerPage);
    this.totalItems = records.map((record) => ({
      ...record,
      typeClass: record.type === "income" ? "green" : "red",
      typeText: record.type === "income" ? "Income" : "Outcome",
      category: categories.find((category) => (category.id = record.categoryId))
        .name,
    }));
    this.loading = false;
  },
  computed: {
    currentPage() {
      return this.$route.query.page || 1;
    },
    currentItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.totalItems.slice(start, end);
    },
  },
});
</script>
