import {RestaurantEntity} from '../Models/Entity/RestaurantEntity';
import {getDetailsInterest, getInterestForCoordinates} from '../Hook/google/Places';
import {ReviewsEntity} from "./Entity/ReviewsEntity";

export class RestaurantsModel {

    /**
     * Recherche les donées depuis google et créer les entités des classes
     *
     * @param {Map} map : Map google
     * @param {object} coordinates : Coordonées de départ pour la recherche
     * @resolve {array} restaurant
     **/
    getAroundRestaurant(map, coordinates) {
        return new Promise((resolve, reject) => {
            getInterestForCoordinates(coordinates, ['restaurant'], 1500, map)
            .then((response) => {
                let restaurants = [];
                response.forEach((restaurant) => {
                    restaurants.push(new RestaurantEntity(restaurant.name, restaurant.rating, restaurant.geometry.location, restaurant.vicinity ,restaurant.place_id));
                });

                resolve(restaurants);
            })
            .catch((error) => {
                reject("Impossible de rechercher les données sur l'API Google. Error : " + error);
            });
        })
    }

    getRestaurantWithReviews(map, place_id) {
        return new Promise((resolve, reject) => {
            const fields = [
                'name',
                'rating',
                'photos',
                'place_id',
                'geometry',
                'vicinity',
                'reviews'
            ];

            getDetailsInterest(map, place_id, fields).then((response) => {
                let restaurant = new RestaurantEntity(response.name, response.rating, response.geometry.location, response.vicinity, response.place_id, [], response.photos ? response.photos : null);
                let reviews = [];

                // Création des entité pour les avis des utilisateurs
                response.reviews.forEach((review) => {
                    reviews.push(new ReviewsEntity(review.author_name, review.rating, review.relative_time_description, review.text, review.time));
                });

                restaurant.setReviews(reviews);

                resolve(restaurant);
            }).catch((error) => {
                reject("Impossible de rechercher les données sur l'API");
            })

        });


    }
}