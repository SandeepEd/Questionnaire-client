import client from '../utils/http';
import { IUser } from '../types/user';

export class UserService {
  static getUser() {
    return client.get<IUser>(`/user/me`);
  }
}
