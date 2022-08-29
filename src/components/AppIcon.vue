<script setup lang="ts">
defineProps<{
  name?: string;
  size?: string | number;
  color?: string;
}>();
</script>
<template>
  <span
    class="iconfont"
    :style="{ color: color, fontSize: size + 'px' }"
    :class="$attrs.class"
  >
  </span>
</template>
