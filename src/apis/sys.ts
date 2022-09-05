import { promisefy } from '@/utils/req';
export function getDataByCode(data: any): Promise<any> {
  return promisefy(data, '/front/resource/get', 'get');
}
export function login(data: any): Promise<any> {
  return promisefy(data, '/ajax/login');
}
