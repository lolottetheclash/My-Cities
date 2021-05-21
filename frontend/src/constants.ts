export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  travels?: string[];
}

export interface IUserLogged extends IUser {
  _id: string;
}
