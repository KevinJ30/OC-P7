import React, {useState, useEffect, useContext} from 'react';
import {RestaurantItem} from "./RestaurantItem";
import {RestaurantsModel} from "../../Models/RestaurantsModel";
import {RestaurantEntity} from "../../Models/Entity/RestaurantEntity";
import {StoresContext} from "../../Context/StoresContext";
import {useSubscribeRestaurantStore} from "../../Hook/subscribers/RestaurantSubscriber.hook";

export function RestaurantList(props) {
    useSubscribeRestaurantStore(props.handleUpdateRestaurant);
    const {mapStore, restaurantsStore} = useContext(StoresContext);
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);



    // const {mapStore, restaurantsStore} = useContext(StoresContext);
    //
    // /**
    //  * Etat du composant
    //  **/
    // const [restaurants, setRestaurant] = useState([]);
    //
    // const [isMounted, setMounted] = useState(false);
    //
    // useEffect(() => {
    //     setMounted(true);
    //
    //     return () => {
    //         setMounted(false);
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     let subscriber = null;
    //
    //     if(isMounted) {
    //         subscriber = restaurantsStore.subscribe(() => {
    //             setRestaurant(restaurantsStore.state.data);
    //         });
    //     }
    //
    //     return () => {
    //         restaurantsStore.unsubscribe(subscriber);
    //     }
    // }, [isMounted, restaurantsStore])
    //
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
    //
    /**
     * Chargement de la liste des restaurants
     **/
    useEffect(() => {
        if(isLoadedMapInstance) {
            if(props.data.length === 0) {
                loadData(false);
            }
        }
    }, [isLoadedMapInstance]);

    function loadData(dataMemory) {
        let restaurantModel = new RestaurantsModel();

        if(dataMemory) {
            restaurantsStore.store({
                loaded: true,
                data: [
                    new RestaurantEntity('test', 2.3, {lat:3, lng:3}, '2 impasse bagnolie serignan-du-comtat', Date.now()),
                    new RestaurantEntity('test', 2.3, {lat:3, lng:3}, '2 impasse bagnolie serignan-du-comtat', Date.now())
                ]
            });

            restaurantsStore.notify();
        }
        else {
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

    if(props.data) {
        if(props.data.length > 0) {
            return <ul className="restaurant-list">{drawRestaurants(props.data)}</ul>;
        }
    }

    return <div className="no-react-restaurant"><p>Il n'y a aucun restaurants.</p></div>;
}

