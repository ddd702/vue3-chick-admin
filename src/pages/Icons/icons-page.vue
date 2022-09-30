<template>
  <ck-page>
    <h4>
      图标是通过<a href="https://www.iconfont.cn/" target="_blank"
        >开源项目iconfont</a
      >生成， 当然大家也可以根据自己的需要添加自己的图标，
      本项目集成了一个叫ck-icon的组件，可方便大家使用
    </h4>
    <div class="ck-code-cell">
      <pre v-hl>{{ iconCode }}</pre>
    </div>
    <div class="icon-wrapper">
      <div
        class="icon-item t-pointer"
        v-for="item in list"
        :key="item"
        v-copy="'icon-' + item"
        copy-success-tip="类名已复制"
        title="点击复制类名"
      >
        <!--size单位是px，color传入颜色值,不传则根据外部的color样式而定-->
        <ck-icon size="26" :class="getIconClass(item)" />
        <p>icon-{{ item }}</p>
      </div>
    </div>
  </ck-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  meta: {
    path: '/icons',
    title: '图标',
    enTitle: 'Icons',
    auth: false,
    cache: true,
  },
  name: 'icons',
  setup() {
    return {
      iconCode: ` 
        <!--size单位是px，color传入颜色值,不传则根据外部的color样式而定-->
        <ck-icon size="26" class="icon-search" />
        `,
      list: [
        'image',
        'language',
        'skin',
        'clear',
        'lock',
        'unlock',
        'bohui',
        'dayin',
        'gou',
        'gaojisousuo',
        'pinglun',
        'shouji',
        'kefu',
        'tishi',
        'canyin',
        'tongxun',
        'zongjine',
        'debug',
        'moon',
        'sun',
        'share',
        'mkdir',
        'dir-setting',
        'minus',
        'userinfo',
        'briefcase',
        'more',
        'zoomin',
        'close',
        'agenda',
        'more-a',
        'security',
        'permission',
        'plus',
        'info',
        'database',
        'menu-setting',
        'doc',
        'content',
        'role',
        'thirdparty',
        'role-permission',
        'disabled',
        'upload',
        'dir-security',
        'delete',
        'list',
        'home-setting',
        'platform',
        'warn',
        'log',
        'doc-setting',
        'fresh',
        'setting-a',
        'question',
        'role-cate',
        'correct',
        'search',
        'handle',
        'fetch',
        'publish',
        'download',
        'sleep',
        'time',
        'contact-setting',
        'zoomout',
        'delete-a',
        'contact',
        'integration',
        'unread',
        'finish',
        'app-setting',
        'mode',
        'xiaoxi',
        'wodetongxunlu',
        'shenjiguanli',
        'home',
        'users',
        'tree',
        'officer',
        'setting',
        'expand',
        'read',
        'privacy',
        'view',
        'admin',
        'user-info',
        'fold',
        'unview',
      ],
    };
  },
  methods: {
    getIconClass(item: string) {
      const out: any = {};
      out['icon-' + item] = true;
      return out;
    },
  },
});
</script>
<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
}
.icon-item {
  font-size: 12px;
  width: 130px;
  text-align: center;
  margin: 10px;
}
</style>
