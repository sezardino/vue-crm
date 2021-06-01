<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesCreate />

        <CategoriesEdit />
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
});
</script>
