import React from 'react';
import {RestaurantStore} from "../Stores/RestaurantStore";
import {MapStore} from "../Stores/MapStore";

export const restaurantStore = new RestaurantStore();
export const mapStore = new MapStore();

export const Stores = {
    restaurantsStore: restaurantStore,
    mapStore: mapStore
};

export const StoresContext = React.createContext(Stores);