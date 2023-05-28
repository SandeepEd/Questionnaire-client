import cookie from 'cookie';
import { AxiosResponse } from 'axios';
import client from '../utils/http';
import { ILogin, IUser } from '../types/user';
export class AuthService {
  static login(data: ILogin): Promise<AxiosResponse<IUser>> {
    return client.post(`/login`, data);
  }

  static signUp(data: ILogin) {
    return client.post(`/sign-up`, data);
  }
}

export const login = async (data: ILogin) =>
  await client.post(`/login`, data);

export const getSession = () => {
  const { spa_token } = cookie.parse(document.cookie);
  return spa_token;
};
