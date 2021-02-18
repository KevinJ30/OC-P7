import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {Rating} from "./Rating";
import {Stores, StoresContext} from "../../Context/StoresContext";
import {Home} from "../../Pages/Home";
import {DisplayRestaurant} from "../../Pages/DisplayRestaurant";

export function RestaurantItem(props) {
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

    function handleClick(event) {
        event.preventDefault();
        props.mapStore.setCenterMap(props.value.lat, props.value.long);
    }

    const bestCommentRestaurant = getBestRating(props.value.ratings);
    const pathname = '/restaurant/' + props.value.id;

    return (
        <div id={props.value.restaurantName} className="react-restaurant card mb-3 shadow-sm rounded">

            <div className="card-body">
                <h3 className="react-restaurant__title card-title text-left"><a href="#" onClick={handleClick}>{props.value.restaurantName}</a></h3>
                <div className="card-rating text-left">
                    <Rating restaurant={props.value} />
                </div>

                <p className="react-restaurant__address card-text text-left"><i className="bi bi-geo-alt-fill" />{props.value.address}</p>
                <p className="react-restaurant__comment card-text rounded"><i className="bi bi-chat-right-quote-fill" /> {bestCommentRestaurant.comment}</p>
                <Link className="btn btn-outline-dark" to={pathname}>Voir tous les avis</Link>
            </div>
        </div>
    );
}