import React, {useState, useEffect} from 'react';
import {RestaurantItem} from "./RestaurantItem";

export function RestaurantList(props) {
    const [restaurants, setRestaurant] = useState([]);

    useEffect(() => {
        setRestaurant(props.store.getAll())
    }, [props.store])

    return <div>
                <h2>Liste des restaurants</h2>
                {drawRestaurants(restaurants)}
            </div>;
}

function drawRestaurants(restaurants) {
    if (restaurants.length > 0) {
        return restaurants.map((restaurant) => {
            if(restaurant.restaurantName) {
                return <RestaurantItem key={restaurant.restaurantName} value={restaurant} stars={restaurant.ratings[0].stars} />
            }

            return false;
        });
    }

    return <div className="no-react-restaurant"><p>Il n'y a aucun restaurants.</p></div>
}