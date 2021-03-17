import React from 'react';
import {RestaurantStore} from "../Stores/RestaurantStore";
import {MapStore} from "../Stores/MapStore";
import {EventManager} from "../EventManager/EventManager";

const restaurantStore = new RestaurantStore();
const mapStore = new MapStore();
const eventManager = new EventManager();

export const Stores = {
    restaurantsStore: restaurantStore,
    mapStore: mapStore,
    eventManager: eventManager
};

export const StoresContext = React.createContext(Stores);