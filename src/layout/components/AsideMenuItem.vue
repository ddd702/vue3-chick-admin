<template>
  <template v-for="item in menus" :key="item.hash">
    <el-sub-menu v-if="item.children" :index="item.hash">
      <template #title>
        <el-icon v-if="!subMenu || item.icon">
          <ck-icon :class="setIcon(item)" />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <AsideMenuItem sub-menu :menus="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :route="{ path: item.path || '' }" :index="item.hash">
      <el-icon v-if="!subMenu || item.icon">
        <ck-icon :class="setIcon(item)" />
      </el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { MenuItem } from '@/stores/layout';
export default defineComponent({
  name: 'AsideMenuItem',
  props: {
    subMenu: {
      type: Boolean,
    },
    menus: {
      type: Array<MenuItem>,
    },
  },
  methods: {
    setIcon(item: MenuItem): object {
      const outClass: any = {};
      if (!item.icon) {
        item.icon = 'doc';
      }
      outClass[`icon-${item.icon}`] = true;
      return outClass;
    },
  },
});
</script>

<style></style>
