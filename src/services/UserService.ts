import { AxiosResponse } from 'axios';
// import { useQuery } from 'react-query';
import client from '../utils/http';
import { IUser } from '../types/user';

export class UserService {
  static getUser(): Promise<AxiosResponse<IUser>> {
    return client.get<IUser>(`/user/me`);
  }
}

// export const useGetUser = () => useQuery({
//   queryKey: `user`,
//   queryFn: () => UserService.getUser().then((res) => res.data),
// });
