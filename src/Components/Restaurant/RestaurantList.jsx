import React, {useState, useEffect} from 'react';
import {RestaurantItem} from "./RestaurantItem";
import {getInterestForCoordinates} from "../../Hook/google/Places";
import {addMarkerToMap} from "../../Hook/google/API";

export function RestaurantList(props) {
    const [restaurants, setRestaurant] = useState([]);
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);

    // Quand la map est chargé on charge les données de google ou un autre service
    function handleChangeMap() {
        setLoadedMapInstance(true);
    }

    useEffect(() => {
        props.mapStore.subscribe(handleChangeMap);
    }, [props.mapStore])

    useEffect(() => {
        if(isLoadedMapInstance) {
            getInterestForCoordinates(props.mapStore.state.coordinates, ['restaurant'], 500, props.mapStore.state.map, (results) => {
                setRestaurant(results);

                // Ajout des marker sur la map
                results.forEach((interest) => {
                    addMarkerToMap(props.mapStore.state.map,
                        {
                            lat: interest.geometry.location.lat(),
                            lng: interest.geometry.location.lng()
                        },

                        interest.name)
                })
            });
        }
    }, [isLoadedMapInstance, props.mapStore.state.coordinates, props.mapStore.state.map])

    function drawRestaurants(restaurants) {
        if (restaurants.length > 0) {
            return restaurants.map((restaurant) => {
                if(restaurant.name) {
                    return <RestaurantItem key={restaurant.name} value={restaurant} stars={[{'comment': 'mlqsdqlkmsdmlqskmdl', 'stars': 2}]} mapStore={props.mapStore}/>
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

