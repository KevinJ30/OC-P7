import React, {useState, useEffect, useContext} from 'react';
import {RestaurantItem} from "./RestaurantItem";
import {RestaurantsModel} from "../../Models/RestaurantsModel";
import {RestaurantEntity} from "../../Models/Entity/RestaurantEntity";
import {StoresContext} from "../../Context/StoresContext";

export function RestaurantList(props) {
    const {mapStore, restaurantsStore} = useContext(StoresContext);
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {

        // Subscriber
        let subscriber = restaurantsStore.subscribe(() => {
            setRestaurants(restaurantsStore.state.data);
        });

        return () => {
            restaurantsStore.unsubscribe(subscriber);
        }
    }, [props.data, restaurants, restaurantsStore])

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
        return <ul className="restaurant-list">{drawRestaurants(restaurants)}</ul>;
    }

    return <div className="no-react-restaurant"><p>Il n'y a aucun restaurants.</p></div>;
}

