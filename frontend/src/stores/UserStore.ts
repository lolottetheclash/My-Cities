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

  @observable public isUserLogged = !!localStorage.userSession;

  @observable public isUserCreated = false;

  @observable public isLoading = false;

  @observable public error: string | null = null;

  @action public fetchUsers(): void {
    this.setLoadingStatus(true);
    axios.get(usersUrl).then((response) => {
      this.setUsers(response.data.users);
      this.setLoadingStatus(false);
    });
  }

  @action public async createUser(user: IUser): Promise<void> {
    this.setLoadingStatus(true);
    await axios
      .post(usersUrl, user)
      .then((response) => {
        this.users.push(response.data.user);
        this.setUserCreatedStatus(true);
        this.setLoadingStatus(false);
      })
      .catch((err) => {
        this.setUserCreatedStatus(false);
        this.setError(err.response.data.error);
      });
  }

  @action public async logUser(
    userCredentials: IUserCredentials
  ): Promise<void> {
    this.setLoadingStatus(true);
    await axios
      .post(`${usersUrl}/auth`, userCredentials)
      .then((response) => {
        this.setUserLoggingStatus(true);
        this.setCurrentUser(response.data.user);
        this.setLoadingStatus(false);
        localStorage.setItem('userSession', response.data.userSessionToken);
      })
      .catch((err) => {
        this.setUserLoggingStatus(false);
        this.setError(err.response.data.error);
      });
  }

  @action public async logOutUser(userId: string): Promise<void> {
    this.setLoadingStatus(true);
    await axios
      .post(`${usersUrl}/logOut`, { id: userId })
      .then(() => {
        this.setUserLoggingStatus(false);
        this.setCurrentUser(null);
        this.setLoadingStatus(false);

        localStorage.removeItem('userSession');
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

  @action private setLoadingStatus(isLoading: boolean) {
    this.isLoading = isLoading;
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
    makeObservable(this);
    this.fetchUsers();
  }
}

export const userStore = new UserStore();
