import axios from 'axios';
import { ElMessage } from 'element-plus';
import { CookieEnum } from '@/contants';
import { useLogStore, LogEnum } from '@/stores/log';
import Utils from '@/utils';

// 创建一个错误
function errorCreat({ msg, otherinfo }: { msg: string; otherinfo: any }): void {
  const err = new Error(msg);
  errorLog(err, otherinfo);
}

// 记录和显示错误
function errorLog(err: Error, moreInfo = '') {
  const logStore = useLogStore();
  // 添加到日志
  logStore.add({
    type: LogEnum.Err,
    info: err.message,
    title: '数据请求异常',
    moreInfo,
    err,
  });
  if (import.meta.env.MODE === 'development') {
    console.log(err);
  }
  // 显示提示
  ElMessage({
    message: err.message,
    type: 'error',
    duration: 5 * 1000,
  });
}
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_HOST,
  timeout: 5000, // 请求超时时间
});
// 请求拦截器,里面的rcode是根据api.70read.com的code来判断，不同项目请自行修正

service.interceptors.request.use(
  (config: any) => {
    // 在请求发送之前做一些处理
    if (!/^https:\/\/|http:\/\//.test(config.url) && !!!config.noToken) {
      const token = Utils.cookies.get(CookieEnum.token);
      if (token && token !== 'undefined') {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['token'] = token;
      }
      // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return config;
  },
  (error) => {
    // 发送失败
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { rcode } = dataAxios;
    const errMsg = dataAxios.msg || '';
    const otherinfo = `<p>methods:${
      response.config.method
    }</p><p>data:${JSON.stringify(
      response.config.data
    )}</p><p>params:${JSON.stringify(response.config.params)}</p><p>url:${
      response.config.url
    }</p>`;
    // 根据 code 进行判断
    if (rcode === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios;
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断

      if (rcode === 702) {
        //token失败
        errorCreat({ msg: `${errMsg}`, otherinfo });
        Utils.cookies.remove(CookieEnum.token);
        return Utils.goLogin();
      }
      switch (rcode) {
        case 200:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios;
          break;
        default:
          // 不是正确的 code
          // 如果config或者data里面有silent字段，不弹出信息
          if (!response.config.silent) {
            if (response.config.params && response.config.params.silent) {
              break;
            }
            if (response.config.data && response.config.data.silent) {
              break;
            }
            errorCreat({ msg: `${errMsg}`, otherinfo });
          } else {
            throw new Error(errMsg);
          }
          break;
      }
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错${error.response.status}: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
    }
    errorLog(error);
    return Promise.reject(error);
  }
);
export default service;
