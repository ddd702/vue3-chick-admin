<template>
  <el-dialog
    draggable
    append-to-body
    v-model="layoutStore.themeDialogShow"
    :title="$t('header.theme')"
    width="370px"
  >
    <div class="t-flex t-flex-wrap ck-theme-list">
      <ThemeItem
        v-for="(item, index) in layoutStore.themes"
        :key="index"
        :active="index === layoutStore.themeActiveIndex"
        :item="item"
        @select="select"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="layoutStore.closeThemeDialog">{{
          $t('close')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import ThemeItem from './ThemeItem.vue';
import { useLayoutStore } from '@/stores/layout';
const layoutStore = useLayoutStore();
function select(name: string): void {
  layoutStore.setTheme(name);
}
</script>

<style>
.dialog-header {
  margin: 10px 0;
}
</style>
