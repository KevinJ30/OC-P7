export function useCalculatedAverageStars(restaurantRatings) {
    if(restaurantRatings){
        const reducer = (accumulator, currentValue) => accumulator + currentValue.stars;
        return restaurantRatings.reduce(reducer, 0) / restaurantRatings.length;
    }

    return false;
}

export function useCreateStars(average) {
    let stars = [];

    for(let i = 0; i < Math.ceil(average); i++) {
        stars.push(<i key={i} className="bi bi-star-fill mr-2" />)
    }

    return stars;
}