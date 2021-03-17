import React from 'react';
import {useCalculatedAverageStars, useCreateStars} from "../../Hook/Stars";

export function Stars(props) {
    const starsDisplay = useCreateStars(props.stars);

    function displayStars() {
        return starsDisplay.map((star) => star);
    }

    return <div>{displayStars()}</div>;
}

export function Rating(props) {
    const averageStars = useCalculatedAverageStars(props.restaurant.ratings);
    return <Stars stars={averageStars} />;
}