<template>
  <ck-page>
    <section class="item">
      <el-button
        size="large"
        type="warning"
        :copy-success-tip="$t('copySuccess')"
        v-copy="copyCode"
      >
        v-copy
      </el-button>
      <p class="code-tip">用于复制文本，基于clipboard.js</p>
      <div class="code-cell">
        <code lang="html" v-hl>{{ copyCode }}</code>
      </div>
    </section>
    <section class="item">
      <el-button type="warning" size="large"> v-hl </el-button>
      <p class="code-tip">
        用于代码高亮，lang属性若不赋值，默认html,
        <a
          style="color: #999"
          target="blank"
          href="https://highlightjs.readthedocs.io/en/latest/supported-languages.html"
          >(点击查看支持的lang)</a
        >
        该指令请用在code，pre元素上,依赖hightlight.js
      </p>
      <div class="code-cell">
        <pre lang="javascript" v-hl>{{ hlCode }} </pre>
      </div>
    </section>
  </ck-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  meta: {
    path: '/directive',
    title: '自定义指令',
    enTitle: 'directive',
    auth: false,
    cache: true,
  },
  name: 'directive',
  setup() {
    return {
      hlCode: `
<div class="code-cell">
  <pre lang="javascript" v-hl>{{hlCode}} </pre>
</div>
<div class="code-cell">
  <code lang="html" v-hl>{{hlCode2}} </code>
</div>
      `,
      copyCode: `
      <el-button
        type="primary"
        copy-success-tip="复制成功"
        v-copy="copyText"
      >
        v-copy指令
      </el-button>`,
      copyText: 'ddd:这是要复制的内容' + Date.now(),
    };
  },
});
</script>
<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
}
.code-cell {
  padding: 10px 0;
  pre,
  code {
    display: block;
    width: 100%;
    overflow: auto;
    border-radius: 4px;
    padding: 10px;
  }
}
.dark {
  .code-tip {
    color: #ddd;
  }
}
.code-tip {
  padding: 10px 0;
  color: #333;
  font-size: 13px;
}
</style>
