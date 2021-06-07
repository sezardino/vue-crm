<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!currentItems.length">
      The are no records.
      <router-link to="/record">Create new record</router-link>
    </p>

    <section v-else>
      <div class="history-chart">
        <Chart v-bind="{ ...chart }" v-if="chart" />
      </div>
      <HistoryTable :records="currentItems" />

      <Paginate :total-pages="totalPages" :current-page="currentPage" />
    </section>
  </div>
</template>

<script lang="ts">
import HistoryTable from "@/components/HistoryTable.vue";
import { defineComponent } from "vue";
import Chart from "@j-t-mcc/vue3-chartjs";

export default defineComponent({
  components: { HistoryTable, Chart },
  data() {
    return {
      loading: true,
      items: [],
      records: [],
      itemsPerPage: 3,
      chart: null,
    };
  },
  methods: {
    updatePage() {
      this.currentPage = this.$route.params.page;
    },
    setup(categories) {
      this.totalPages = Math.round(this.records.length / this.itemsPerPage);
      this.totalItems = this.records.map((record) => ({
        ...record,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Income" : "Outcome",
        category: categories.find(
          (category) => category.id === record.categoryId
        ).name,
      }));

      this.chartSetup(categories);
    },
    chartSetup(categories) {
      const chartData = categories.map((category) => {
        const recordsData = this.records.filter(
          (record) =>
            record.categoryId === category.id && record.type === "outcome"
        );
        return {
          name: category.name,
          value: recordsData.reduce((acc, record) => acc + +record.amount, 0),
          color:
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
        };
      });
      console.log(chartData);
      this.chart = {
        type: "pie",
        data: {
          labels: chartData.map((chart) => chart.name),
          datasets: [
            {
              backgroundColor: chartData.map((chart) => chart.color),
              data: chartData.map((chart) => chart.value),
            },
          ],
        },
      };
    },
  },
  async mounted() {
    this.records = await this.$store.dispatch("getRecords");
    const categories = await this.$store.dispatch("getCategories");

    this.setup(categories);

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
