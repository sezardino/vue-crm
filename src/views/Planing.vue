<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="page-title">
      <h3>Planing</h3>
      <h4 v-format.currency="info.bill"></h4>
    </div>

    <section v-if="categories.length">
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.name }}:</strong>
          {{ formatCurrency(category.outcome) }} /
          {{ formatCurrency(category.limit) }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="category.color"
            :style="{ width: category.progress + '%' }"
          ></div>
        </div>
      </div>
    </section>
    <p v-else>
      You don't have categoryes.
      <router-link to="/categories"
        >Click here to create new category</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import { formatCurrency } from "@/utils/formatting";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  data() {
    return { loading: true, categories: [] };
  },
  async mounted() {
    const categories = await this.$store.dispatch("getCategories");
    const records = await this.$store.dispatch("getRecords");

    this.categories = categories.map((category) => {
      const { name, limit, id } = category;

      const outcome = records
        .filter((record) => record.categoryId === category.id)
        .filter((record) => record.type === "outcome")
        .reduce((acc, record) => acc + record.amount, 0);

      const progressPercent = Math.round((outcome / limit) * 100);
      const progress = progressPercent > 100 ? 100 : progressPercent;
      const color =
        progressPercent < 60
          ? "green"
          : progressPercent > 60 && progressPercent < 80
          ? "yellow"
          : "red";
      const tooltip =
        outcome > limit
          ? "exceeding the money limit " +
            formatCurrency(Math.abs(outcome - limit))
          : "Until the limit is exhausted: " + formatCurrency(limit - outcome);

      return {
        name,
        limit,
        id,
        outcome,
        tooltip,
        progress,
        color,
      };
    });

    this.loading = false;
  },
  methods: {
    formatCurrency,
  },
  computed: {
    ...mapGetters(["info"]),
  },
});
</script>
