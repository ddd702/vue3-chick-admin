<template>
  <el-dialog
    draggable
    append-to-body
    v-model="logStore.visible"
    :title="$t('header.checkLog')"
    width="85%"
  >
    <div class="dialog-header">
      <el-button type="danger" round @click="handleClear">
        <ck-icon class="icon-delete" />
        {{ $t('clear') }}
      </el-button>
    </div>
    <el-table :data="logStore.list" stripe style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div style="padding: 0 10px">
            <el-descriptions title="更多信息：">
              <el-descriptions-item v-if="props.row.err" label="错误堆栈">
                {{ props.row.err.stack }}
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions v-if="props.row.moreInfo" title="附带数据：">
              <el-descriptions-item>
                <div v-html="props.row.moreInfo"></div>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="70" label="序号" type="index"></el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="70"
        :filters="typeFilters"
        :filter-method="handleTypeFilter"
      />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="info" label="信息" width="180">
        <template #default="props">
          <div v-html="props.row.info"></div>
        </template>
      </el-table-column>
      <el-table-column prop="time" width="180" label="时间" />
      <el-table-column prop="url" label="路径" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="logStore.visible = false">{{
          $t('close')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useLogStore, LogEnum } from '@/stores/log';
const logStore = useLogStore();
const typeFilters = [
  {
    text: LogEnum.Err,
    value: LogEnum.Err,
  },
  {
    text: LogEnum.Log,
    value: LogEnum.Log,
  },
  {
    text: LogEnum.Warn,
    value: LogEnum.Warn,
  },
];
const handleTypeFilter = (value: string, row: any, column: any): boolean => {
  const property = column['property'];
  return row[property] === value;
};
const handleClear = (): void => {
  logStore.clear();
};
</script>

<style>
.dialog-header {
  margin: 10px 0;
}
</style>
