import React, { useContext } from 'react';
import TravelStore from './TravelStore';

interface IStoresContext {
  travelsStore: TravelStore;
}

const stores = {
  travelsStore: new TravelStore(),
};

export const AppContext = React.createContext(stores);

export const useStores = (): IStoresContext => {
  return useContext(AppContext);
};
