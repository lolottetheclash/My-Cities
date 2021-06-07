import axios from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { IUser, IUserLogged } from '../constants';

const usersUrl = 'api/users';

interface IUserCredentials {
  email: string;
  password: string;
}

export class UserStore {
  @observable public currentUser: IUserLogged | null = null;

  @observable public users: IUser[] = [];

  @observable public isUserLogged = false;

  @observable public isUserCreated = false;

  @observable public isLoading = false;

  @observable public error: string | null = null;

  @action public fetchUsers(): void {
    this.isLoading = true;
    axios.get(usersUrl).then((response) => {
      this.setUsers(response.data.users);
      this.isLoading = false;
    });
  }

  @action public async createUser(user: IUser): Promise<void> {
    this.isLoading = true;
    await axios
      .post(usersUrl, user)
      .then((response) => {
        this.users.push(response.data.user);
        this.setUserCreatedStatus(true);
        this.isLoading = false;
      })
      .catch((err) => {
        this.setUserCreatedStatus(false);
        this.setError(err.response.data.error);
      });
  }

  @action public async logUser(
    userCredentials: IUserCredentials
  ): Promise<void> {
    this.isLoading = true;

    await axios
      .post(`${usersUrl}/auth`, userCredentials)
      .then((response) => {
        this.setUserLoggingStatus(true);
        this.setCurrentUser(response.data.user);
        console.log('lalala user logged ', this.isUserLogged);
      })
      .catch((err) => {
        this.setUserLoggingStatus(false);
        this.setError(err.response.data.error);
      });
  }

  @action public async logOutUser(userId: string): Promise<void> {
    console.log('lalala logout');

    this.isLoading = true;
    await axios
      .post(`${usersUrl}/logOut`, { id: userId })
      .then(() => {
        console.log('lalala then');
        this.setUserLoggingStatus(false);
        this.setCurrentUser(null);
      })
      .catch((err) => {
        this.setUserLoggingStatus(true);
        this.setError(err.response.data.error);
      });
  }

  @action public setError(error: string | null): void {
    this.error = error;
  }

  @action private setUsers(users: IUser[]): void {
    this.users = users;
  }

  @action private setCurrentUser(user: IUserLogged | null): void {
    this.currentUser = user;
  }

  @action public setUserLoggingStatus(isLogged: boolean): void {
    this.isUserLogged = isLogged;
  }

  @action public setUserCreatedStatus(isCreated: boolean): void {
    this.isUserCreated = isCreated;
  }

  @computed get usersLength(): number {
    return this.users.length;
  }

  constructor() {
    this.fetchUsers();
    makeObservable(this);
    console.log('on repasse ici');
  }
}

export const userStore = new UserStore();
