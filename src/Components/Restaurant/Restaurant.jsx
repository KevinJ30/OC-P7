import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Map} from "../Maps/Map";
import {StoresContext} from "../../Context/StoresContext";
import {getDetailsInterest} from "../../Hook/google/Places";
import {Stars} from "./Rating";
import {addMarkerToMap, } from "../../Hook/google/API";
import {Review} from "../review/Review";

export function Restaurant(props) {
    const storeContext = useContext(StoresContext);
    const [isLoadedmap, setIsLoadedMap] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const {id} = useParams();

    useEffect(() => {
        storeContext.mapStore.subscribe(() => {
            setIsLoadedMap(true);
        });
    }, [storeContext.mapStore])

    useEffect(() => {
        const fields = [
            "name",
            "formatted_address",
            "place_id",
            "geometry",
            "reviews",
            "rating"
        ];

        if(isLoadedmap) {
            getDetailsInterest(id, fields, storeContext.mapStore.state.map, (result, status) => {
                setRestaurant(result);

                let position = new window.google.maps.LatLng(
                    result.geometry.location.lat(),
                    result.geometry.location.lng(),
                );

                // Ajouter le marker sur la map
                addMarkerToMap(storeContext.mapStore.state.map, position, result.name);

                // On centre la map sur le point
                storeContext.mapStore.setCenterMap(result.geometry.location.lat(), result.geometry.location.lng())
            })
        }
    }, [id, isLoadedmap, storeContext.mapStore]);

    function drawReviews(restaurant) {
        if(Object.keys(restaurant).length) {
            return restaurant.reviews.map((review) => {
                const key = review.author_name + review.time;
                return <Review key={key} data={review} />;
            })
        }
    }

    return <div className="container mt-3">
        <Link to="/">Home</Link>

        <div className="d-flex justify-content-between">

            <div className="title">

                <h1>{restaurant.name}</h1>
                <div className="d-flex">
                    <p><Stars stars={restaurant.rating} /></p>
                </div>

            </div>

            <div className="button">
                <button className="btn btn-primary">Donnez votre avis</button>
            </div>
        </div>

        <Map store={storeContext.mapStore}  />

        <div className="mt-3">
            { drawReviews(restaurant) }
        </div>
    </div>;
}