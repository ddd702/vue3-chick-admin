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
    console.warn(e.message);
    reject(e);
  }
  resolve(res.data);
}
export const opts = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};
export const promisefy = (
  data: object,
  url: string,
  type = 'post'
): Promise<void> =>
  new Promise(async (resolve, reject) => {
    requestFun(resolve, reject, {
      type,
      data,
      opts,
      url,
    });
  });
