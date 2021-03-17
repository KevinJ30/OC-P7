import React, {useState, useEffect, useContext} from 'react';
import {RestaurantItem} from "./RestaurantItem";
import {RestaurantsModel} from "../../Models/RestaurantsModel";
import {StoresContext} from "../../Context/StoresContext";

export function  RestaurantList(props) {
    const {mapStore, restaurantsStore} = useContext(StoresContext);
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantsFiltered, setRestaurantsFiltered] = useState([]);
    const [ratingFilter, setRatingFilter] = useState({})
    const [isMounted, setMounted] = useState(true);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        }
    }, [])

    useEffect(() => {
        setRatingFilter(props.filter);
    }, [props.filter])

    useEffect(() => {
        // Subscriber
        let subscriber = restaurantsStore.subscribe(() => {
            setRestaurants(restaurantsStore.state.data);
        });

        return () => {
            restaurantsStore.unsubscribe(subscriber);
        }
    }, [props.data, restaurants, restaurantsStore])

    useEffect(() => {
        setRestaurantsFiltered(restaurants);
    }, [restaurants])

    useEffect(() => {
        const filteredRestaurant = restaurants.filter(restaurant => {
            if(restaurant.rating >= ratingFilter.min && restaurant.rating <= ratingFilter.max) {
                return restaurant;
            }
        });

        setRestaurantsFiltered(filteredRestaurant);
    }, [ratingFilter])

    /**
     * Indique quand la map est chargé
     **/
    useEffect(() => {
        let subscriber = null;

        if(isMounted) {
            subscriber = mapStore.subscribe(() => {
                setLoadedMapInstance(true);
            });
        }

        return () => {
            mapStore.unsubscribe(subscriber);
        }
    }, [mapStore]);

    /**
     * Chargement de la liste des restaurants
     **/
    useEffect(() => {
        if(props.data) {
            setRestaurants(props.data);
        }

        if(isLoadedMapInstance) {
            loadData();
        }
    }, [isLoadedMapInstance]);

    function loadData(dataMemory) {
        let restaurantModel = new RestaurantsModel();

        restaurantModel.getAroundRestaurant(mapStore.state.map, mapStore.state.coordinates).then((data) => {
            restaurantsStore.store({
                loaded: true,
                data: data
            });
            restaurantsStore.notify();
        }).catch(() => {
            console.error('Impossible de joindre le server !!!');
        });
    }

    function drawRestaurants(restaurants) {
        if (restaurants.length > 0) {
            return restaurants.map((restaurant) => {
                if (restaurant.name) {
                    return <RestaurantItem key={restaurant.name} value={restaurant}
                                           stars={[{'comment': 'mlqsdqlkmsdmlqskmdl', 'stars': 2}]}
                                           mapStore={props.mapStore}/>
                }

                return false;
            });
        }
    }

    if(restaurants.length > 0) {
        return <ul className="restaurant-list">{drawRestaurants(restaurantsFiltered)}</ul>;
    }

    return <div className="no-react-restaurant"><p>Il n'y a aucun restaurants.</p></div>;
}

