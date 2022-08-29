import { promisefy } from '@/utils/req';
export function hito(data) {
  return promisefy(data, '/front/hito', 'get');
}
