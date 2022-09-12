<template>
  <div class="ck-theme-item">
    <div @click="setTheme" class="ck-theme-item-inner">
      <section v-if="active" class="ck-theme-item-selected">
        <ck-icon class="icon-correct" color="#fff" size="30" />
      </section>
      <el-image
        title="点击切换"
        :src="pic"
        fit="cover"
        class="ck-theme-pic t-pointer"
      >
        <template #error> {{ $t('noImage') }} </template>
      </el-image>
    </div>
    <h4>{{ item.title || item.name || $t('default') }}</h4>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { ThemeType } from '@/stores/layout';
const emits = defineEmits(['select']);
const props = defineProps<{
  active: boolean;
  index?: number;
  item: ThemeType;
}>();
const darkView = ref(false);
const pic = computed(() => {
  return darkView.value
    ? props.item.darkPreview || props.item.preview
    : props.item.preview;
});
const setTheme = () => {
  emits('select', props.item.name);
};
</script>

<style lang="scss">
.ck-theme {
  &-item {
    margin: 5px;
    text-align: center;
    &-selected {
      background-color: rgba(5, 5, 5, 0.5);
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-inner {
      position: relative;
      line-height: 1;
    }
  }
  &-pic {
    background-color: #ddd;
    line-height: 100px;
    color: #333;
    font-size: 12px;
    width: 100px;
    height: 100px;
    > img {
      display: block;
    }
  }
}
</style>
