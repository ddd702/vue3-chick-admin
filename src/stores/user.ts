/**
 * 用户信息
 * */
import { defineStore } from 'pinia';
import Utils from '@/utils';
import { CookieEnum } from '@/contants';
type StateType = {
  id?: string | number;
  token: string;
  userName: string;
  avatar: string;
};
export const useUserStore = defineStore({
  id: 'user',
  state(): StateType {
    let initialState = {
      id: '-1',
      token: '',
      userName: 'ghost',
      avatar: 'https://cravatar.cn/avatar/',
    };
    try {
      if (Utils.cookies.get(CookieEnum.userInfo)) {
        initialState = JSON.parse(
          Utils.cookies.get(CookieEnum.userInfo) || JSON.stringify(initialState)
        );
      }
    } catch (error) {}
    return Object.assign(initialState, {
      token: Utils.cookies.get(CookieEnum.token) || '',
    });
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    setUser(val: {
      id?: '' | undefined;
      userName?: '' | undefined;
      avatar?: '' | undefined;
      token?: '' | undefined;
    }): void {
      const { userName = '', avatar = '', id = '-1', token = '' } = val;
      this.userName = userName;
      this.avatar = avatar;
      this.id = id;
      Utils.cookies.set(
        CookieEnum.userInfo,
        JSON.stringify({ userName, avatar, id })
      );
      Utils.cookies.set(CookieEnum.token, token);
    },
    setToken(val: string | undefined): void {
      this.token = val || '';
      Utils.cookies.set(CookieEnum.token, val || '');
    },
  },
});
