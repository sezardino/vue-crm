<template>
  <component :is="layout"> </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseLayout from "./layouts/BaseLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

export default defineComponent({
  components: { BaseLayout, AuthLayout },
  data() {
    return {};
  },
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    },
  },
});
</script>
