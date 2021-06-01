<template>
  <component :is="layout"> </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import messages from "./utils/messages";
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
    error() {
      return this.$store.getters.error;
    },
  },
  mounted() {
    const message = this.$route.query.message;

    if (message) {
      this.$message(messages[message]);
    }
  },
  watch: {
    error(error) {
      this.$error(error);
    },
  },
});
</script>
