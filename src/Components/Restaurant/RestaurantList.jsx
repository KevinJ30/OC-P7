import React, {useState, useEffect} from 'react';
import {RestaurantItem} from "./RestaurantItem";

export function RestaurantList(props) {
    const [restaurants, setRestaurant] = useState([]);
    const store = props.store;


    useEffect(() => {
        store.subscribe(() => {
            setRestaurant(store.getAll())
        })
    }, [store])

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

