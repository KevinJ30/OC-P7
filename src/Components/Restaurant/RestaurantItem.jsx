import React, {useState, useEffect} from 'react';

export function RestaurantItem(props) {
    const [stars, setStars] = useState(0);

    useEffect(() => {
        setStars(getStars(props.stars));
    }, [props.stars])

    function drawStars(element) {
        if(element) {
            return element;
        }

        return false;
    }


    function getStars(numberStars) {
        let stars = [];

        for(let i = 0; i < numberStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill mr-2" />)
        }

        return stars;
    }

    return <div id={props.value.title} className="react-restaurant card mb-3 shadow-sm rounded">
        <div className="card-body">
            <h3 className="react-restaurant__title card-title text-left">{props.value.title}</h3>
            <div className="card-rating text-left">
                {
                    drawStars(stars)
                }
            </div>

            <p className="react-restaurant__address card-text text-left"><i className="bi bi-geo-alt-fill" />{props.value.address}</p>
            <p className="react-restaurant__comment card-text rounded"><i className="bi bi-chat-right-quote-fill" /> {props.value.ratings[0].comment}</p>
            <button className="btn btn-outline-dark">Voir tous les avis</button>
        </div>
    </div>;
}