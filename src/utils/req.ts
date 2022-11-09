import Axios from '@/plugins/axios';
type paramsType = {
  type: string;
  data: any;
  opts?: any;
  url: string;
};
export async function requestFun(
  resolve: any,
  reject: any,
  params: paramsType
): Promise<void> {
  let res = {
    data: null,
    rcode: 500,
    msg: 'requset error',
  };
  const urlPrefix = '';
  try {
    if (params.type === 'post') {
      res = await Axios.post(urlPrefix + params.url, params.data, params.opts);
    } else {
      res = await Axios.get(urlPrefix + params.url, {
        params: params.data,
        ...params.opts,
      });
    }
  } catch (e: any) {
    reject(e);
  }
  resolve(res.data);
}
export const opts = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  noToken: false, //true：不带token,false：带token
  silent: false, //true：不toast错误，false：toast请求错误
};
export const promisefy = (
  data: any,
  url: string,
  type = 'post',
  otherOpts: any = {}
): Promise<void> =>
  new Promise(async (resolve, reject) => {
    if (data.hasOwnProperty('_silent')) {
      opts.silent = true;
      delete data['_silent'];
    }
    requestFun(resolve, reject, {
      type,
      data,
      opts: Object.assign({}, opts, otherOpts),
      url,
    });
  });
