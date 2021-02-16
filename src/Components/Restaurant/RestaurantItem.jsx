import React, {useState, useEffect} from 'react';

export function RestaurantItem(props) {
    const [stars, setStars] = useState(0);

    useEffect(() => {
        setStars(createStars(getAverageStars(props.value.ratings)));
    }, [props.value.ratings])

    function drawStars(element) {
        if(element) {
            return element;
        }

        return false;
    }


    function createStars(averageStars) {
        let stars = [];

        for(let i = 0; i < Math.round(averageStars); i++) {
            stars.push(<i key={i} className="bi bi-star-fill mr-2" />)
        }

        return stars;
    }

    function getBestRating(rates) {
        let sort = rates.sort((element1, element2) => {
            if(element1.stars < element2.stars) {
                return 1;
            } else if(element1.stars > element2.stars) {
                return -1;
            }
            return 0;
        });

        return sort[0];
    }

    function getAverageStars(rates) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.stars;
        return rates.reduce(reducer, 0) / rates.length;
    }

    const bestCommentRestaurant = getBestRating(props.value.ratings);

    return <div id={props.value.restaurantName} className="react-restaurant card mb-3 shadow-sm rounded">
        <div className="card-body">
            <h3 className="react-restaurant__title card-title text-left">{props.value.restaurantName}</h3>
            <div className="card-rating text-left">
                {
                    drawStars(stars)
                }
            </div>

            <p className="react-restaurant__address card-text text-left"><i className="bi bi-geo-alt-fill" />{props.value.address}</p>
            <p className="react-restaurant__comment card-text rounded"><i className="bi bi-chat-right-quote-fill" /> {bestCommentRestaurant.comment}</p>
            <button className="btn btn-outline-dark">Voir tous les avis</button>
        </div>
    </div>;
}