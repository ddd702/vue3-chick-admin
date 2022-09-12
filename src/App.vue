<script lang="ts">
import { defineComponent, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import { useLayoutStore } from '@/stores/layout';

export default defineComponent({
  components: {
    ElConfigProvider,
    RouterView,
  },
  setup() {
    const layoutStore = useLayoutStore();
    const { eleLang } = storeToRefs(layoutStore);
    return { eleLang };
  },
});
</script>

<template>
  <ElConfigProvider :locale="eleLang">
    <RouterView />
  </ElConfigProvider>
</template>
