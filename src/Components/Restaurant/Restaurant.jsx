import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Rating} from "./Rating";


export function Restaurant(props) {
    const [restaurant, setRestaurant] = useState({})

    let {id} = useParams();

    useEffect(() => {
        setRestaurant(props.store.getRestaurant(id));
    }, [id])

    return <div className="container">
        <div className="col-md-12 card">
            <h1>{restaurant.restaurantName}</h1>
            <Rating restaurant={restaurant} test="1111" />
        </div>
    </div>;
}