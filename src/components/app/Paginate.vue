<template>
  <ul class="pagination">
    <li :class="{ disabled: !hasPrevPage }">
      <router-link :to="prev" disabled
        ><i class="material-icons">chevron_left</i></router-link
      >
    </li>
    <li
      v-for="item in totalPages"
      :key="item"
      :class="{
        active: item === +currentPage,
      }"
    >
      <router-link :to="`/history?page=${item}`">{{ item }}</router-link>
    </li>
    <li class="waves-effect" :class="{ disabled: !hasNextPage }">
      <router-link :to="next"
        ><i class="material-icons">chevron_right</i></router-link
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["totalPages", "currentPage"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    hasPrevPage() {
      return this.currentPage - 1 === 0 ? false : true;
    },
    hasNextPage() {
      return +this.currentPage + 1 > this.totalPages ? false : true;
    },
    prev() {
      if (!this.hasPrevPage) {
        return "";
      }
      return `/history?page=${+this.currentPage - 1}`;
    },
    next() {
      if (!this.hasNextPage) {
        return "";
      }
      return `/history?page=${+this.currentPage + 1}`;
    },
  },
});
</script>
