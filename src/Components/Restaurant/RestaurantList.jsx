import React, {useState, useEffect, useContext} from 'react';
import {RestaurantItem} from "./RestaurantItem";
import {RestaurantsModel} from "../../Models/RestaurantsModel";
import {connect} from "react-redux";
import {mapRestaurantStoreToState} from "../../Stores/Restaurants/RestaurantStore";
import {StoresContext} from "../../Context/StoresContext";
import {ADD_RESTAURANT_ACTION, STORE_RESTAURANT_ACTION} from "../../Stores/Restaurants/RestaurantReducer";

export function RestaurantList({restaurantStore, add_restaurant, store_restaurants}) {
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);

    // const [restaurantsFiltered, setRestaurantsFiltered] = useState([]);
    // const [ratingFilter, setRatingFilter] = useState({})
    const [isMounted, setMounted] = useState(true);
    const [loadedData, setLoadedData] = useState(false);
    const {mapStore} = useContext(StoresContext);

    // useEffect(() => {
    //     setMounted(true);
    //
    //     return () => {
    //         setMounted(false);
    //     }
    // }, [])

    // useEffect(() => {
    //     setRatingFilter(props.filter);
    // }, [props.filter])
    //
    // useEffect(() => {
    //     // Subscriber
    //     let subscriber = restaurantsStore.subscribe(() => {
    //         setRestaurants(restaurantsStore.state.data);
    //     });
    //
    //     return () => {
    //         restaurantsStore.unsubscribe(subscriber);
    //     }
    // }, [props.data, restaurants, restaurantsStore])

    // useEffect(() => {
    //     setRestaurantsFiltered(restaurants);
    // }, [restaurants])
    //
    // useEffect(() => {
    //     const filteredRestaurant = restaurants.filter(restaurant => {
    //         if(restaurant.rating >= ratingFilter.min && restaurant.rating <= ratingFilter.max) {
    //             return restaurant;
    //         }
    //     });
    //
    //     setRestaurantsFiltered(filteredRestaurant);
    // }, [ratingFilter])

    /**
     * Indique quand la map est chargé
     **/
    useEffect(() => {
        let subscriber = null;

        subscriber = mapStore.subscribe(() => {
            setLoadedMapInstance(true);
        });

        return () => {
            mapStore.unsubscribe(subscriber);
        }
    }, [mapStore]);

    /**
     * Chargement de la liste des restaurants
     **/
    // useEffect(() => {
    //     if(props.data) {
    //         setRestaurants(props.data);
    //     }
    //
    //     if(isLoadedMapInstance) {
    //         loadData();
    //     }
    // }, [isLoadedMapInstance]);

    // function loadData(dataMemory) {
    //     let restaurantModel = new RestaurantsModel();
    //
    //     restaurantModel.getAroundRestaurant(mapStore.state.map, mapStore.state.coordinates).then((data) => {
    //         restaurantsStore.store({
    //             loaded: true,
    //             data: data
    //         });
    //         restaurantsStore.notify();
    //     }).catch(() => {
    //         console.error('Impossible de joindre le server !!!');
    //     });
    // }

    useEffect(() => {
        if(isMounted && isLoadedMapInstance && !loadedData) {
            const restaurantModel = new RestaurantsModel();

            restaurantModel.getAroundRestaurant(mapStore.state.map, mapStore.state.coordinates).then((data) => {
                store_restaurants(data);
                setLoadedData(true);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [isLoadedMapInstance, loadedData, add_restaurant, mapStore.state.coordinates, mapStore.state.map])

    function drawRestaurants(restaurants) {
        if (restaurants.length > 0) {
            return restaurants.map((restaurant) => {
                if (restaurant.name) {
                    return <RestaurantItem key={restaurant.name} value={restaurant}
                                           stars={[{'comment': 'mlqsdqlkmsdmlqskmdl', 'stars': 2}]}
                                           mapStore={mapStore}/>
                }

                return false;
            });
        }
    }

    if(restaurantStore.data.length > 0) {
        return <ul className="restaurant-list">{drawRestaurants(restaurantStore.data)}</ul>;
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

