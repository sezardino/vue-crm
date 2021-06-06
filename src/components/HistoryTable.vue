<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Category</th>
        <th>Type</th>
        <th>Open</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td v-format.currency="record.amount"></td>
        <td v-format.date="record.date"></td>
        <td>{{ record.category }}</td>
        <td>
          <span :class="[record.typeClass]" class="white-text badge">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            v-tooltip="'Show more info'"
            @click="$router.push('/details/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    records: {
      require: true,
      type: Array,
    },
  },
});
</script>
