import {RestaurantEntity} from '../Models/Entity/RestaurantEntity';
import {getInterestForCoordinates, getInterestForCoordinatesTest} from '../Hook/google/Places';

export class RestaurantsModel {

    constructor() {
        this.listener = [];
    }

    /**
     * Recherche les donées depuis google et créer les entités des classes
     * 
     * @param {Map} map : Map google
     **/
    getAroundRestaurant(map, coordinates) {
        return new Promise((resolve, reject) => {

            getInterestForCoordinates(coordinates, ['restaurant'], 500, map)
            .then((response) => {
                let restaurants = [];

                response.forEach((restaurant) => {
                    console.log(restaurant);
                    restaurants.push(new RestaurantEntity(restaurant.name, restaurant.rating, restaurant.geometry.location, restaurant.vicinity ,restaurant.place_id));
                });

                resolve(restaurants);
            })
            .catch((error) => {
                reject("Impossible de rechercher les données sur l'API Google.");
            });

        })
    }
}