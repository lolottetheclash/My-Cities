import axios from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { IUser } from '../constants';

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  travels: [],
};

const usersUrl = 'api/users';

interface IUserCredentials {
  email: string;
  password: string;
}

class UserStore {
  @observable public user: IUser = emptyUser;

  @observable public users: IUser[] = [];

  @observable public isUserLogged = false;

  @observable public isLoading = false;

  @observable public error: string | null = null;

  @action public fetchUsers(): void {
    this.isLoading = true;
    axios.get(usersUrl).then((response) => {
      this.setUsers(response.data.users);
      this.isLoading = false;
    });
  }

  @action public createUser(user: IUser): void {
    this.isLoading = true;
    axios
      .post(usersUrl, user)
      .then((response) => {
        this.users.push(response.data.user);
        this.isLoading = false;
      })
      .catch((err) => {
        console.log('Error in user creation : ', err.response.data);
      });
  }

  @action public async logUser(
    userCredentials: IUserCredentials
  ): Promise<void> {
    this.isLoading = true;
    await axios
      .post(`${usersUrl}/auth`, userCredentials)
      .then((res) => {
        this.setUserLoggingStatus(true);
      })
      .catch((err) => {
        this.setUserLoggingStatus(false);
        this.setError(err.response.data.error);
      });
  }

  @action public setError(error: string | null): void {
    this.error = error;
  }

  @action private setUsers(users: IUser[]): void {
    this.users = users;
  }

  @action private setUserLoggingStatus(isLogged: boolean): void {
    this.isUserLogged = isLogged;
  }

  @computed get usersLength(): number {
    return this.users.length;
  }

  constructor() {
    this.fetchUsers();
    makeObservable(this);
  }
}

export default UserStore;
