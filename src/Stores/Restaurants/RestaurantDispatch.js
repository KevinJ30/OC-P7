import {ADD_RESTAURANT_ACTION} from "./RestaurantReducer";

export function add_restaurant_dispatch(restaurant, dispatch) {
    dispatch({
        type: ADD_RESTAURANT_ACTION,
        payload: {
            restaurants: restaurant
        }
    })
}