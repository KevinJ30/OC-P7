import {createStore} from "redux";
import {RestaurantReducer} from "./RestaurantReducer";

/**
 * Store Restaurant Redux
 **/
export const restaurantStore = createStore(
    RestaurantReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // middleware pour Redux deve tools
)

/**
 * Fonction mapping du store redux
 * @return {{restaurants}} Map l'état dans le composant react
 **/
export function mapRestaurantStoreToState(state) {
    return {
        restaurants: state.restaurants
    };
}