import React from 'react';

export function RestaurantItem(props) {
    return <div id={props.value.title} className="react-restaurant">
        <h2 className="react-restaurant__title">{props.value.title}</h2>
        <p className="react-restaurant__address">{props.value.address}</p>
        <p className="react-restaurant__comment">{props.value.ratings[0].comment}</p>
    </div>;
}