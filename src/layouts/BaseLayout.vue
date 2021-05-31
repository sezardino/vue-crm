<template>
  <Loader v-if="loading" />
  <div v-else class="app-main-layout">
    <navbar @toggleSidebar="sidebarVisibility = !sidebarVisibility"></navbar>

    <sidebar v-model:isOpen="sidebarVisibility"></sidebar>

    <main class="app-content" :class="!sidebarVisibility ? 'full' : ''">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/app/Sidebar.vue";
import Navbar from "../components/app/Navbar.vue";

export default defineComponent({
  components: { Navbar, Sidebar },
  data() {
    return {
      sidebarVisibility: true,
      loading: true,
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchData");
    }

    this.loading = false;
  },
  methods: {},
});
</script>
