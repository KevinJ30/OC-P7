import React, {useMemo} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Stars} from "./Rating";

export function Restaurant(props) {
    let {id} = useParams();
    let store = props.store;

    const restaurantMemo = useMemo(function() {
        return store.getRestaurant(id);
    }, [store, id])

    function numberOpinion(opinions) {
        return opinions.length;
    }

    function displayOpinions(opinions) {
        return opinions.map((opinion) => {
            return <div className="opinion">
                <Stars stars={opinion.stars} />
                <p className="opinion__rating">{opinion.stars}</p>
                <p>{opinion.comment}</p>
                <hr/>
            </div>;
        });
    }

    return <div className="container mt-3">
        <Link to="/">Home</Link>

        <h1>{restaurantMemo.restaurantName}</h1>

        <p className="react-restaurant__address card-text text-left"><i className="bi bi-geo-alt-fill" />{restaurantMemo.address}</p>

        <div className="col-md-12 card p-3">
            <div className="container">
                <h3>Avis :</h3> Il y a {numberOpinion(restaurantMemo.ratings)} avis.
                <hr/>

                { displayOpinions(restaurantMemo.ratings) }
            </div>
        </div>
    </div>;
}