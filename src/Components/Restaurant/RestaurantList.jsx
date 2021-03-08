import React from 'react';
import {RestaurantItem} from "./RestaurantItem";

export function RestaurantList(props) {
    function drawRestaurants(restaurants) {
        console.log(restaurants);
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
                {drawRestaurants(props.restaurants)}
        </div>;
}

