import { promisefy } from '@/utils/req';
export function hito(data: any = {}): Promise<any> {
  return promisefy(data, '/front/hito', 'get');
}
