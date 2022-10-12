<template>
  <ck-page class="posts-page">
    <p style="padding: 20px 0">
      编辑器使用请参考
      <a
        style="opacity: 0.7"
        target="_blank"
        href="https://www.wangeditor.com/v5/getting-started.html"
      >
        wangedit指南
      </a>
      本例子只展示基本操作
    </p>
    <div style="margin: 0 0 20px 0">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="postHtml"
        :defaultConfig="editorConfig"
        mode="default"
        @onCreated="onEditorCreated"
      />
    </div>
    <el-button
      @click="() => (dialogVisible = true)"
      type="primary"
      style="width: 100%"
      >获取源内容</el-button
    >
    <el-dialog v-model="dialogVisible" title="源内容">
      {{ postHtml }}
    </el-dialog>
  </ck-page>
</template>

<script lang="ts">
import { ref, shallowRef, defineComponent } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default defineComponent({
  meta: {
    path: '/editpost',
    title: '富文本编辑',
    enTitle: 'Rich Editor',
    auth: false,
    cache: false,
  },
  name: 'editpost',
  components: { Editor, Toolbar },
  setup() {
    const editorConfig = { placeholder: '请输入内容...' };
    const editorRef = shallowRef();
    const toolbarConfig = {
      excludeKeys: ['fullScreen'],
    };
    return {
      postHtml: ref(''),
      dialogVisible: ref(false),
      editorRef,
      toolbarConfig,
      editorConfig,
    };
  },
  unmounted() {
    this.editorRef.destroy();
  },
  methods: {
    onEditorCreated(editor: any) {
      this.editorRef = editor;
    },
  },
});
</script>

<style lang="scss">
.dark {
  --w-e-toolbar-disabled-color: #aaa;
  --w-e-toolbar-bg-color: #444;
  --w-e-toolbar-border-color: #444;
  --w-e-toolbar-color: #ddd;
  --w-e-toolbar-active-bg-color: #777;
  --w-e-textarea-color: #ddd;
  --w-e-textarea-bg-color: #555;
  --w-e-modal-button-bg-color: #777;
  --w-e-textarea-slight-bg-color: #666;
  .w-e-menu-tooltip-v5 {
    --w-e-toolbar-bg-color: #fff;
  }
}
</style>
