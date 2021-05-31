<template>
  <div class="card orange darken-3 bill-card">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">Exchange rate</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="rate in rates" :key="rate">
            <td>rate</td>
            <td>12121</td>
            <td>12.12.12</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["rates", "date"],
});
</script>
