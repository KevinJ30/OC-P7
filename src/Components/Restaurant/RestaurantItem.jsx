import React from 'react';

export function RestaurantItem(props) {

    return <div className="react-restaurant">
        <h2>{props.value.title}</h2>
    </div>;

}