<script lang="ts">
import { defineComponent, Ref } from 'vue';
import { ref } from 'vue';
export default defineComponent({
  setup() {
    const title: Ref<string> = ref(import.meta.env.VITE_APP_TITLE);
    const description: Ref<string> = ref('说明');
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
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
