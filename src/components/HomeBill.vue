<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Score in </span>

        <p class="currency-line" v-for="currency in currencies" :key="currency">
          <span
            v-format:[currency].currency="Math.floor(base * rates[currency])"
          ></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["rates"],
  data() {
    return {
      currencies: ["PLN", "EUR", "USD"],
    };
  },
  computed: {
    base() {
      return Math.floor(
        this.$store.getters.info.bill / (this.rates.PLN / this.rates.EUR)
      );
    },
  },
});
</script>
