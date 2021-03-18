import {add_restaurant, remove_restaurant, store_restaurants, update_restaurant_action} from "./RestaurantActions";

/**
 * Constantes d'actions
 **/
export const STORE_RESTAURANT_ACTION = 'STORE_RESTAURANT_ACTION';
export const ADD_RESTAURANT_ACTION = 'ADD_RESTAURANT_ACTION';
export const REMOVE_RESTAURANT_ACTION = 'REMOVE_RESTAURANT_ACTION';
export const UPDATE_STORE_ACTION = 'UPDATE_STORE_ACTION';

export const DEFAULT_COORDINATES = {
    lat: 48.856613,
    lng: 2.352222,
    zoom: 14
}

/**
 * Etat initial
 **/
const INITIAL_STATE = {
    data: [],
    dataFiltered: [],
    isFiltered: false,
    map: null,
    isLoadedMap: false,
    markers: [],
    coordinates: DEFAULT_COORDINATES
};

/**
 * @param {{}} state Etat du store
 * @param {{type, payload}} action action a appliquer par le reducer
 **/
export function RestaurantReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case STORE_RESTAURANT_ACTION:
            return store_restaurants(state, action.payload);
        case ADD_RESTAURANT_ACTION:
            return add_restaurant(state, action.payload);
        case REMOVE_RESTAURANT_ACTION:
            return remove_restaurant(state, action.payload)
        case UPDATE_STORE_ACTION:
            return update_restaurant_action(state, action.payload);
        default:
            return state;
    }
}