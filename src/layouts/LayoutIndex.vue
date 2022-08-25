<template>
  <div class="app-wrapper">
    <el-row>
      <el-col :span="24">
        <LayoutHeader />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <RouterView />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { RouterView } from 'vue-router';
import LayoutHeader from './components/LayoutHeader.vue';
export default {
  components: {
    RouterView,
    LayoutHeader,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
.app {
  &-wrapper {
    height: 100vh;
  }
}
</style>
