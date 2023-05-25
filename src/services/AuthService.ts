import cookie from 'cookie';
import client from '../utils/http';
import { IUser } from '../types/user';

export class AuthService {
  static login(data: IUser) {
    return client.post(`/login`, data);
  }

  static signUp(data: IUser) {
    return client.post(`/sign-up`, data);
  }
}

export const login = async (data: IUser): Promise<IUser> =>
  await client.post(`/login`, data);

export const getSession = () => {
  const { spa_token } = cookie.parse(document.cookie);
  return spa_token;
};
