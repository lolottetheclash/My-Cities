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

  @observable public isLoading = false;

  @action public fetchUsers(): void {
    this.isLoading = true;
    axios.get(usersUrl).then((response) => {
      this.setUsers(response.data.users);
      this.isLoading = false;
    });
  }

  @action setUsers(users: IUser[]): void {
    this.users = users;
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

  @action public logUser(userCredentials: IUserCredentials): void {
    this.isLoading = true;
    axios
      .post(`${usersUrl}/auth`, userCredentials)
      .then((response) => {
        // TODOOOOOOOOOO : Gérer ce qu'on renvoie
        console.log('lalala response in userStore ', response);
      })
      .catch((err) => {
        // TODOOOOOOOOOO : Gérer ce qu'on renvoie

        console.log('lalala error in userStore : ', err.response.data);
      });
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
