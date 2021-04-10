import React, { useContext } from 'react';
import TravelStore from './TravelStore';
import UserStore from './UserStore';

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
