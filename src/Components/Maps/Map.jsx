import React, {useEffect, useState} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import config from '../../config.json';

const loaderGoogle = new Loader({
    apiKey: config.API_KEY,
    version: "weekly"
})

const defaultCoordinate = {
    lat: 48.856613,
    lng: 2.352222,
    zoom: 12
}

export function Map(props) {
    const [map, setMap] = useState(null);

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

            props.store.update(map);
        })
    }

    return <div id="react-google-map" className="card shadow-sm">Map google</div>;
}