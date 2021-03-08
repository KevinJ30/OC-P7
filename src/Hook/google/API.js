import {useState, useEffect} from 'react';
import {Loader} from "@googlemaps/js-api-loader";
import config from "../../config.json";

export const LOADER_GOOGLE = new Loader({
    apiKey: config.API_KEY,
    version: "weekly",
    libraries: ['places']
});

/**
 * Indique si l'api google est bien chargé
 *
 * @param loaderGoogle
 * @returns {boolean}
 **/
export function useLoadedService() {
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        LOADER_GOOGLE.load().then(() => {
            setLoaded(true);
        })
    }, []);

    return isLoaded;
}

/**
 * Ajoute un marker a la map
 *
 * @param map : Instance de la map google
 * @param position : Position du marker
 * @param title : Titre du marker
 * 
 * @return {Marker} marker
 **/
export function addMarkerToMap(map, position, title) {
    const marker = new window.google.maps.Marker({
        position: position,
        title: title
    });

    marker.setMap(map);

    return marker;
}

/**
 * Centre la map sur position
 * @param map : Instance de la map
 * @param lat : latitude
 * @param lng : longitude
 * @param zoom : zoom du centre
 **/
export function centerMap(map, lat, lng) {
    map.setCenter({
        lat: lat,
        lng: lng,
    });
}

