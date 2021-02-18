import React from 'react';
import {useCalculatedAverageStars, useCreateStars} from "../../Hook/Stars";

export function Rating(props) {
    const averageStars = useCalculatedAverageStars(props.restaurant.ratings);
    const starsDisplay = useCreateStars(averageStars);

    function displayStars(stars) {
        return stars.map((star) => star);
    }

    return <div>
        { displayStars(starsDisplay) }
    </div>;
}