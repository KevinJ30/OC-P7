import React, {useEffect} from 'react';
import {Stars} from "./Rating";
import {Link} from "react-router-dom";

export function RestaurantItem(props) {
    let pathname = "/restaurant/" + props.value.placeId;

    useEffect(() => {
        return () => {
            // Suppression de son marqueur sur la map
        }
    }, [])

    function handleClick(event) {
        event.preventDefault();
        const lat = typeof props.value.geometry.location.lat !== "number" ? props.value.geometry.location.lat() : props.value.geometry.location.lat;
        const lng = typeof props.value.geometry.location.lng !== "number" ? props.value.geometry.location.lng() : props.value.geometry.location.lng;

        props.mapStore.setCenterMap(lat, lng);
    }

    return (
        <div id={props.value.name} className="react-restaurant card mb-3 shadow-sm rounded">
            <div className="card-body">
                <h3 className="react-restaurant__title card-title text-left"><button className="card-restaurant__title-btn" onClick={handleClick}>{props.value.name}</button></h3>
                <div className="card-rating text-left">
                    <Stars stars={props.value.rating} />
                </div>

                <p className="react-restaurant__address card-text text-left"><i className="bi bi-geo-alt-fill" />{props.value.address}</p>
                {/*<p className="react-restaurant__comment card-text rounded"><i className="bi bi-chat-right-quote-fill" /> {bestCommentRestaurant.comment}</p>*/}
                {<Link className="btn btn-outline-dark" to={pathname}>Voir tous les avis</Link>}
            </div>
        </div>
    );
}