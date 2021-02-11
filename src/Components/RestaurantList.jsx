import React, {useState, useEffect} from 'react';

export function RestaurantList(props) {
    const [restaurants, setRestaurant] = useState([]);

    useEffect(() => {
        setRestaurant(props.store.getAll())
    }, [])

    return <div>
        <h2>Liste des restaurants</h2>

        {drawRestaurants(restaurants)}

    </div>;
}

function drawRestaurants(restaurants) {
    if (restaurants.length > 0) {
        return restaurants.map((restaurant) => <div key={restaurant.title}
                                                    className='react-restaurant'>{restaurant.title}</div>);
    }

    return <div className="no-react-restaurant"><p>Il n'y a aucun restaurants.</p></div>
}