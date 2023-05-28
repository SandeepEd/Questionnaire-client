export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  assignment_submitted: boolean;
}
