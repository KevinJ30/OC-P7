import React, {useEffect, useState} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import config from '../../config.json';

const loaderGoogle = new Loader({
    apiKey: config.API_KEY,
    version: "weekly",
    libraries: ['places']
})

const defaultCoordinate = {
    lat: 48.856613,
    lng: 2.352222,
    zoom: 12
}

export function Map(props) {
    const [map, setMap] = useState(null);

    function loadMarker(storeRestaurants, map) {
        const restaurants = storeRestaurants.state.restaurants;

        restaurants.forEach((restaurant) => {
            new window.google.maps.Marker({
                position: { lat: restaurant.lat, lng: restaurant.long},
                map,
                title: restaurant.restaurantName
            });
        });
    }

    useEffect(() => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                loadMap(position.coords.latitude, position.coords.longitude, defaultCoordinate.zoom + 3);
            }, () => {
                loadMap(defaultCoordinate.lat, defaultCoordinate.lng, defaultCoordinate.zoom);
            })
        }
        else {
            loadMap(defaultCoordinate.lat, defaultCoordinate.lng, defaultCoordinate.zoom);
        }

        props.store.subscribe(updateStore);

        return () => {
            setMap(null);
        }
    }, []);

    function updateStore(map) {
        setMap(map);
    }

    function loadMap(lat, lng, zoom) {
         loaderGoogle.load().then(() => {
            let map = new window.google.maps.Map(document.getElementById("react-google-map"), {
                center: {lat: lat, lng: lng},
                zoom: zoom
            });

            loadMarker(props.storeRestaurant, map);

            // Recherche a proximité
             const request = {
                 location: new window.google.maps.LatLng(44.25494, 4.64736),
                 radius:5000,
                 type: ['restaurant']
             }

             let service = new window.google.maps.places.PlacesService(map);
             service.nearbySearch(request, callbackPlaces)
             props.store.update(map);
        });

        function callbackPlaces(results, status) {
            if(status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
            }
        }
    }

    return <div id="react-google-map" className="card shadow-sm">Map google</div>;
}