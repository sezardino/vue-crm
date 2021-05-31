<template>
  <div>
    <div class="page-title">
      <h3>Score</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill />

      <div class="col s12 m6 l8">
        <HomeCurrency />
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
    await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
});
</script>
