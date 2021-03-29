/**
 * Créer un tableau d'entité restaurants
 *
 * @param {array} data
 * @return {array<RestaurantEntity>} data : nouveau tableaux de données
 **/
import {RestaurantEntity} from "./Entity/RestaurantEntity";

export function mappingData(data) {
    let restaurants = [];

    data.forEach((restaurant) => {
        restaurants.push(new RestaurantEntity(restaurant.restaurantName, restaurant.ratings[0].stars, {
            lat: restaurant.lat,
            lng: restaurant.lng
        }, restaurant.address, restaurant.id, [], []));
    })

    return restaurants;
}