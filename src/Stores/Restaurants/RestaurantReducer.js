/**
 * Constantes
 **/
import {add_restaurant, remove_restaurant} from "./RestaurantActions";

const ADD_RESTAURANT_ACTION = 'ADD_RESTAURANT_ACTION';
const REMOVE_RESTAURANT_ACTION = 'REMOVE_RESTAURANT_ACTION';

/**
 * Etat initial
 * @type {{data: [], isFiltered: boolean, dataFiltered: [], laoded: boolean}}
 **/
const INITIAL_STATE = {
    loaded: false,
    data: [],
    dataFiltered: [],
    isFiltered: false
};

/**
 * @param {{}} state Etat du store
 * @param {{type, payload}} action action a appliquer par le reducer
 **/
export function RestaurantReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ADD_RESTAURANT_ACTION:
            add_restaurant(state, action.payload);
            break;
        case REMOVE_RESTAURANT_ACTION:
            remove_restaurant(state, action.payload)
            break;
        default:
            return state;
    }
}