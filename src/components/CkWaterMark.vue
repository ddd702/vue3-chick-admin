<template>
  <div class="ck-water-mark-wrapper">
    <div
      v-for="item in new Array(count)"
      :style="{ fontSize: size + 'px', width: getWidth() }"
      :key="item"
      class="ck-water-mark"
    >
      {{ text }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    count: {
      type: Number,
      default: 25,
    },
    size: {
      type: Number,
      default: 22,
    },
    text: {
      type: String,
      default: 'chick admin',
    },
  },
  methods: {
    getWidth() {
      return '20%';
    },
  },
});
</script>
<style lang="scss">
.ck-water-mark-wrapper {
  display: flex;
  z-index: -1;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  opacity: 0.2;
  color: #999;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
}
.ck-water-mark {
  transform: rotate(-25deg);
}
</style>
