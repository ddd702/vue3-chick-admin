import { promisefy } from '@/utils/req';
export function getDataByCode(data: any): Promise<any> {
  return promisefy(data, '/front/resource/get', 'get', { noToken: true });
}
export function login(data: any): Promise<any> {
  return promisefy(data, '/ajax/login');
}
export function getUserConf(): Promise<any> {
  return promisefy({}, '/ajax/userConf');
}
export function loginOut(): Promise<any> {
  return promisefy({}, '/ajax/loginout');
}
