<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
export default defineComponent({
  setup() {
    const title = ref(import.meta.env.VITE_APP_TITLE + import.meta.env.MODE);
    const description = ref('说明');
    return {
      title,
      description,
    };
  },
});
</script>

<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <h2>This is an about page</h2>
  </div>
</template>

<style lang="scss">
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
