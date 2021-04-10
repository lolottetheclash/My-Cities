import axios from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';

interface ITravel {
  title: string;
  city: string;
  description: string;
  pictures?: string[];
  author: string[];
}

const travelsUrl = 'http://localhost:5000/api/travels';

class TravelStore {
  @observable public travels: ITravel[] = [];

  @observable public isLoading = false;

  @action public fetchTravels(): void {
    this.isLoading = true;
    axios.get(travelsUrl).then((response) => {
      this.setTravels(response.data.travels);
      this.isLoading = false;
    });
  }

  @action setTravels(travels: ITravel[]): void {
    this.travels = travels;
  }

  @action public addTravel(travel: ITravel): void {
    this.travels.push(travel);
  }

  @computed get travelsLength(): number {
    return this.travels.length;
  }

  constructor() {
    this.fetchTravels();
    makeObservable(this);
  }
}

export default TravelStore;
