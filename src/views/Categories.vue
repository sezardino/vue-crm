<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoriesCreate @addCategory="addCategory" />

        <CategoriesEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updates"
          @updateCategory="updateCategory"
        />
        <p v-else>The are no categories</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CategoriesCreate from "@/components/CategoriesCreate.vue";
import CategoriesEdit from "@/components/CategoriesEdit.vue";

export default defineComponent({
  name: "categories",
  components: { CategoriesCreate, CategoriesEdit },
  data() {
    return {
      categories: [],
      updates: 0,
      loading: true,
    };
  },
  methods: {
    addCategory(category) {
      this.categories = [...this.categories, category];
    },
    updateCategory(newCategory) {
      this.categories.map((category) => {
        if (category.id === newCategory.id) {
          category.name = newCategory.name;
          category.limit = newCategory.limit;
        }
      });
      this.updates++;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");
    this.loading = false;
  },
});
</script>
