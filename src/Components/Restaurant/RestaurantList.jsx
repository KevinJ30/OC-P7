import React, {useState, useEffect} from 'react';
import {RestaurantItemStore} from "./RestaurantItem";
import {RestaurantsModel} from "../../Models/RestaurantsModel";
import {connect} from "react-redux";
import {mapRestaurantStoreToState} from "../../Stores/Restaurants/RestaurantStore";
import {ADD_RESTAURANT_ACTION, STORE_RESTAURANT_ACTION} from "../../Stores/Restaurants/RestaurantReducer";

export function RestaurantList({restaurantStore, add_restaurant, store_restaurants}) {
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);

    const [isMounted, setMounted] = useState(true);
    const [loadedData, setLoadedData] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        }
    }, [])

    useEffect(() => {
        if (restaurantStore.isLoadedMap) {
            setLoadedMapInstance(true);
        }
    }, [restaurantStore.isLoadedMap])

    useEffect(() => {
        if (isMounted && isLoadedMapInstance && !loadedData) {
            const restaurantModel = new RestaurantsModel();
            restaurantModel.getAroundRestaurant(restaurantStore.map, restaurantStore.coordinates).then((data) => {
                store_restaurants(data);
                setLoadedData(true);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [isMounted, isLoadedMapInstance, loadedData, add_restaurant, restaurantStore.coordinates, restaurantStore.map, store_restaurants])

    function drawRestaurants(restaurants) {
        if (restaurants.length > 0) {
            return restaurants.map((restaurant) => {
                if (restaurant.name) {
                    return <RestaurantItemStore key={restaurant.name} value={restaurant}/>
                }

                return false;
            });
        }
    }

    if (restaurantStore.dataFiltered.length > 0) {
        return <ul className="restaurant-list">{drawRestaurants(restaurantStore.dataFiltered)}</ul>;
    }

    return <div className="no-react-restaurant"><p>Il n'y a aucun restaurants.</p></div>;
}

// Connection du store redux
export const RestaurantListStore = connect(
    mapRestaurantStoreToState,
    (dispatch) =>  ({
        add_restaurant: restaurant => dispatch({
            type: ADD_RESTAURANT_ACTION,
            payload: {
                data: restaurant
            }
        }),

        store_restaurants: restaurants => dispatch({
            type: STORE_RESTAURANT_ACTION,
            payload: {
                restaurants: restaurants
            }
        })
    })
)(RestaurantList);

