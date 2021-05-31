<template>
  <div>
    <div class="page-title">
      <h3>Score</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency" />

      <div class="col s12 m6 l8">
        <HomeCurrency :rates="currency.rates" :date="currency.date" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeBill from "../components/HomeBill.vue";
import HomeCurrency from "../components/HomeCurrency.vue";
export default defineComponent({
  name: "home",
  components: { HomeBill, HomeCurrency },
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  async mounted() {
    // this.currency = await this.$store.dispatch("fetchCurrency");
    setTimeout(() => {
      this.currency = {
        success: true,
        timestamp: 1622468584,
        base: "EUR",
        date: "2021-05-31",
        rates: { USD: 1.21995, PLN: 4.483998, EUR: 1 },
      };
      this.loading = false;
    }, 500);
  },
  methods: {
    async refresh() {
      this.loading = true;
      // this.currency = await this.$store.dispatch("fetchCurrency");
      setTimeout(() => {
        this.currency = {
          success: true,
          timestamp: 1622468584,
          base: "EUR",
          date: "2021-05-31",
          rates: { USD: 1.21995, PLN: 4.483998, EUR: 1 },
        };
        this.loading = false;
      }, 500);
    },
  },
});
</script>
