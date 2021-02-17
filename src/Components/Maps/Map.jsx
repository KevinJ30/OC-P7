import React, {useEffect} from 'react';
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

export function Map() {
    useEffect(() => {
        console.log(navigator);

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
    }, []);

    function loadMap(lat, lng, zoom) {
        loaderGoogle.load().then(() => {
            return new window.google.maps.Map(document.getElementById("google-map"), {
                center: { lat: lat, lng: lng },
                zoom: zoom
            });
        })
    }

    const style = {
        width:'100%',
        height:'100%'
    };

    return <div id="google-map" style={style}>Map google</div>;
}