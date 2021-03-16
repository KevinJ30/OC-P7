import React, { useContext } from 'react';
import {Stars} from "./Rating";
import {Link} from "react-router-dom";
import {StoresContext} from "../../Context/StoresContext";

export function RestaurantItem(props) {
    let pathname = "/restaurant/" + props.value.placeId;
    const {mapStore} = useContext(StoresContext);

    function handleClick(event) {
        event.preventDefault();
        const restaurant = props.value;

        const lat = typeof restaurant.geometry.location.lat !== "number" ? restaurant.geometry.location.lat() : restaurant.geometry.location.lat;
        const lng = typeof restaurant.geometry.location.lng !== "number" ? restaurant.geometry.location.lng() : restaurant.geometry.location.lng;

        mapStore.setCenterMap(lat, lng);
    }

    return (
        <li id={props.value.name} className="react-restaurant card mb-3 shadow-sm rounded">
            <div className="card-body">
                <h3 className="react-restaurant__title card-title text-left"><button className="card-restaurant__title-btn" onClick={handleClick}>{props.value.name}</button></h3>
                <div className="card-rating text-left">
                    <Stars stars={props.value.rating} />
                </div>

                <p className="react-restaurant__address card-text text-left"><i className="bi bi-geo-alt-fill" />{props.value.address}</p>
                {/*<p className="react-restaurant__comment card-text rounded"><i className="bi bi-chat-right-quote-fill" /> {bestCommentRestaurant.comment}</p>*/}
                {<Link className="btn btn-outline-dark" to={pathname}>Voir tous les avis</Link>}
            </div>
        </li>
    );
}