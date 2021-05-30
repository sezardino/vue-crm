<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import messages from "@/utils/messages";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(error) {
      console.log(error);
      this.$error(messages[error.code]);
    },
  },
});
</script>
