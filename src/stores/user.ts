/**
 * 用户信息
 * */
import { defineStore } from 'pinia';
type StateType = {
  token: string;
  userName: string;
  avatar: string;
};
export const useUserStore = defineStore({
  id: 'user',
  state(): StateType {
    return {
      token: '',
      userName: '游客',
      avatar: 'https://cravatar.cn/avatar/',
    };
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    setUser(val: { userName?: '' | undefined; avatar?: '' | undefined }): void {
      const { userName = '', avatar = '' } = val;
      this.userName = userName;
      this.avatar = avatar;
    },
    setToken(val: string | undefined): void {
      this.token = val || '';
    },
  },
});
