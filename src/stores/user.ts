/**
 * 用户信息
 * */
import { defineStore } from 'pinia';
type StateType = {
  id?: string | number;
  token: string;
  userName: string;
  avatar: string;
};
export const useUserStore = defineStore({
  id: 'user',
  state(): StateType {
    return {
      id: '2', //游客的id为-1
      token: '',
      userName: '游客',
      avatar: 'https://cravatar.cn/avatar/',
    };
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    setUser(val: {
      id?: '' | undefined;
      userName?: '' | undefined;
      avatar?: '' | undefined;
    }): void {
      const { userName = '', avatar = '', id = '-1' } = val;
      this.userName = userName;
      this.avatar = avatar;
      this.id = id;
    },
    setToken(val: string | undefined): void {
      this.token = val || '';
    },
  },
});
