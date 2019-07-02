import request from 'umi-request';
import { FromDataType } from './index';

export async function fakeAccountLogin(params: FromDataType) {
  return request('/dev/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/login/captcha?mobile=${mobile}`);
}
