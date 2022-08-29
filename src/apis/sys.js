import { promisefy } from '@/utils/req';
export function getDataByCode(data) {
  return promisefy(data, '/front/resource/get', 'get');
}
