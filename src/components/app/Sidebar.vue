<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li v-for="link in links" :key="link.link" :class="isActiveLink(link.url)">
      <router-link
        class="waves-effect waves-orange pointer"
        :to="link.url"
        :exact="link.exact"
        >{{ link.label }}</router-link
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: { isOpen: Boolean },
  data() {
    return {
      links: [
        { label: "Home", url: "/", exact: true },
        { label: "History", url: "/history", exact: false },
        { label: "Planing", url: "/planing", exact: false },
        { label: "New Record", url: "/record", exact: false },
        { label: "Categories", url: "/categories", exact: false },
      ],
    };
  },
  methods: {
    isActiveLink(link: string) {
      const activeClass = this.$route.path === link ? "active" : "";
      return activeClass;
    },
  },
});
</script>
