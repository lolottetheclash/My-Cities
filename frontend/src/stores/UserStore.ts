import axios from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  travels?: string[];
}

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  travels: [],
};

const usersUrl = 'http://localhost:5000/api/users';

class UserStore {
  @observable public user: IUser = emptyUser;

  @observable public users: IUser[] = [];

  @observable public isLoading = false;

  @action public fetchUsers(): void {
    this.isLoading = true;
    axios.get(usersUrl).then((response) => {
      console.log('lalala ds userStore users : ', response.data.users);
      this.setUsers(response.data.users);
      this.isLoading = false;
    });
  }

  @action setUsers(users: IUser[]): void {
    this.users = users;
  }

  @action public createUser(user: IUser): void {
    this.users.push(user);
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
