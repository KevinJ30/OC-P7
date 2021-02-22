import React from 'react';
import {RestaurantStore} from "../Stores/RestaurantStore";
import {InDataMemory} from "../InDataMemory";
import {MapStore} from "../Stores/MapStore";

export const restaurantStore = new RestaurantStore(new InDataMemory());
export const mapStore = new MapStore();

export const Stores = {
    store: restaurantStore,
    mapStore: mapStore
};

export const StoresContext = React.createContext(Stores);