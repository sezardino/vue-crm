<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text" v-format:datetime.date="date"></span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Profile
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click="logoutHandler">
                <i class="material-icons">assignment_return</i>Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Dropdown } from "materialize-css/dist/js/materialize.min";
import dataMixin from "@/mixins/data";

export default defineComponent({
  emits: ["toggleSidebar"],
  mixins: [dataMixin],
  data() {
    return {
      date: new Date(),
      interval: null as null | number,
      dropdown: null as null | any,
    };
  },
  mounted() {
    this.dropdown = new Dropdown(this.$refs.dropdown, { constrainWidth: true });

    this.interval = setInterval(() => (this.date = new Date()), 1000);
  },

  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },

  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  methods: {
    async logoutHandler() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },
});
</script>
