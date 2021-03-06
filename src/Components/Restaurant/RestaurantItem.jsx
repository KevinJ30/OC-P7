import React from 'react';
import {Stars} from "./Rating";
import {Link} from "react-router-dom";
import {centerMap} from "../../Hook/google/API";

export function RestaurantItem(props) {
    let pathname = "/restaurant/" + props.value.place_id;

    function handleClick(event) {
        event.preventDefault();
        props.mapStore.setCenterMap(props.value.geometry.location.lat(), props.value.geometry.location.lng());
    }

    return (
        <div id={props.value.name} className="react-restaurant card mb-3 shadow-sm rounded">
            <div className="card-body">
                <h3 className="react-restaurant__title card-title text-left"><button className="card-restaurant__title-btn" onClick={handleClick}>{props.value.name}</button></h3>
                <div className="card-rating text-left">
                    <Stars stars={props.value.rating} />
                </div>

                <p className="react-restaurant__address card-text text-left"><i className="bi bi-geo-alt-fill" />{props.value.vicinity}</p>
                {/*<p className="react-restaurant__comment card-text rounded"><i className="bi bi-chat-right-quote-fill" /> {bestCommentRestaurant.comment}</p>*/}
                {<Link className="btn btn-outline-dark" to={pathname}>Voir tous les avis</Link>}
            </div>
        </div>
    );
}