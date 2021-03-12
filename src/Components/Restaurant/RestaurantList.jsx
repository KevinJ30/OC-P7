import React, {useState, useEffect, useContext} from 'react';
import {RestaurantItem} from "./RestaurantItem";
import {StoresContext} from "../../Context/StoresContext";
import {RestaurantsModel} from "../../Models/RestaurantsModel";

export function RestaurantList(props) {
    const {mapStore, restaurantsStore} = useContext(StoresContext);

    /**
     * Etat du composant
     **/
    const [restaurants, setRestaurant] = useState([]);
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        }
    }, [])

    useEffect(() => {
        let subscriber = null;

        if(isMounted) {
            subscriber = restaurantsStore.subscribe(() => {
                setRestaurant(restaurantsStore.state.data);
            });
        }

        return () => {
            restaurantsStore.unsubscribe(subscriber);
        }
    }, [isMounted, restaurantsStore])

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
    }, [isMounted, mapStore]);

    /**
     * Chargement de la liste des restaurants
     **/
    useEffect(() => {

        if(isMounted) {
            let restaurantModel = new RestaurantsModel();

            if(isLoadedMapInstance) {
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
        }
    }, [isMounted, isLoadedMapInstance, mapStore, restaurantsStore])


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

        return <div className="no-react-restaurant"><p>Il n'y a aucun restaurants.</p></div>
    }

    return <div>
                <h2>Liste des restaurants</h2>
                {drawRestaurants(restaurants)}
        </div>;
}

