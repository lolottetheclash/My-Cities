import React, { useContext } from 'react';
import { travelStore, TravelStore } from './TravelStore';
import { userStore, UserStore } from './UserStore';

interface IStores {
  travelStore: TravelStore;
  userStore: UserStore;
}

export const stores: IStores = {
  travelStore,
  userStore,
};

export const AppContext = React.createContext(stores);

export const useStores = (): IStores => {
  return useContext(AppContext);
};
