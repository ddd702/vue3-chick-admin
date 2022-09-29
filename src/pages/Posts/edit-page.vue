<template>
  <ck-page class="posts-page">
    <div>
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
  </ck-page>
</template>

<script lang="ts">
import { ref, shallowRef, defineComponent } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { DomEditor } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default defineComponent({
  meta: {
    path: '/editpost',
    title: '文章编写',
    enTitle: 'Create Post',
    auth: true,
    cache: true,
  },
  name: 'editpost',
  components: { Editor, Toolbar },
  setup() {
    const editorConfig = { placeholder: '请输入内容...' };
    const editorRef = shallowRef();
    const toolbarConfig = {
      excludeKeys: ['fullScreen'],
    };
    return { postHtml: ref(''), editorRef, toolbarConfig, editorConfig };
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
