<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';
import type { FormRules } from 'element-plus';
import { useUserStore } from '@/stores/user';
import { useRouteStore } from '@/stores/route';
import { useLayoutStore } from '@/stores/layout';
import MD5 from 'md5';
import { login } from '@/apis/sys';
import Utils from '@/utils';
export default defineComponent({
  setup() {
    const title = ref(import.meta.env.VITE_APP_TITLE);
    const description = ref('说明');
    const rules = reactive<FormRules>({
      account: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      ],
    });
    return {
      routeStore: useRouteStore(),
      layoutStore: useLayoutStore(),
      userStore: useUserStore(),
      loading: ref(false),
      pswView: ref(false),
      title,
      description,
      rules,
      form: reactive({
        password: '123456',
        account: 'admintest',
      }),
    };
  },
  methods: {
    async submitLogin() {
      const { account, password } = this.form;
      if (account && password) {
        this.loading = true;
        const res = await login({
          name: account,
          psw: MD5(password),
        }).finally(() => (this.loading = false));
        this.userStore.setUser({
          id: res.id,
          userName: res.name,
          avatar: res.avatar,
          token: res.token,
        });

        Utils.goPage(this.routeStore.lastCacheRoute.path);
      }
    },
  },
});
</script>

<template>
  <div class="ck-login">
    <el-image
      v-if="!layoutStore.isMiniScreen"
      class="ck-login-pic"
      src="https://cdn.zcxnb.cn/cloud/2022/09/05/pbbA7hGx_Authentication_Flatline.svg"
    ></el-image>
    <div class="ck-login-card">
      <h2>欢迎使用{{ title }}</h2>
      <el-card shadow="never">
        <template #header>
          <div class="ck-login-header">
            <b>登录</b>
            <div class="ck-login-tip t-pointer">
              <ck-icon class="icon-question" /><span class="text">关于</span>
            </div>
          </div>
        </template>
        <el-form :rules="rules" :model="form" label-width="120px">
          <el-form-item prop="account" label="账号：">
            <el-input
              clearable
              size="large"
              placeholder="输入账号"
              v-model="form.account"
            />
          </el-form-item>
          <el-form-item prop="password" label="密码：">
            <el-input
              clearable
              :type="pswView ? 'text' : 'password'"
              size="large"
              placeholder="输入密码"
              v-model="form.password"
            >
              <template #append>
                <ck-icon
                  @click="pswView = !pswView"
                  class="t-pointer"
                  :class="{ 'icon-view': !pswView, 'icon-unview': pswView }"
                ></ck-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="ck-login-btns">
          <el-button
            @click="submitLogin"
            type="primary"
            size="large"
            :loading="loading"
            >登录</el-button
          >
          <el-button size="large" type="info">忘记密码</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss">
.ck-login {
  --el-font-size-base: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  &-pic {
    margin-right: 40px;
    height: 400px;
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    b {
      font-size: 16px;
      font-weight: bold;
    }
  }
  &-tip {
    font-size: 13px;
    .icon-question {
      font-size: 13px;
    }
    .text {
      margin: 0 5px;
    }
  }
  &-card {
    width: 50%;
    max-width: 500px;
    min-width: 360px;
    > h2 {
      margin-bottom: 20px;
      font-weight: bold;
    }
  }
  &-btns {
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
