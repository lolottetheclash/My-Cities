import React, { useContext } from 'react';
import UserStore from './UserStore';
import TravelStore from './TravelStore';

interface IStoresContext {
  travelsStore: TravelStore;
  userStore: UserStore;
}

const stores = {
  travelsStore: new TravelStore(),
  userStore: new UserStore(),
};

export const AppContext = React.createContext(stores);

export const useStores = (): IStoresContext => {
  return useContext(AppContext);
};
