import React, {useEffect, useCallback, useRef} from 'react';
import {useLoadedService} from "../../Hook/google/API";

export const DEFAULT_COORDINATES = {
    lat: 48.856613,
    lng: 2.352222,
    zoom: 14
}

export function Map(props) {
    const mapRef = useRef(null)
    const isLoadedServiceGoogle = useLoadedService();

    const loadMap = useCallback((lat, lng, zoom) => {
        if(isLoadedServiceGoogle) {
            const position = new window.google.maps.LatLng(lat, lng);

            let map = new window.google.maps.Map(mapRef.current, {
                center: position,
                zoom: zoom
            });

            if(props.clickEvent) {
                // Ajoute un listener sur la map
                map.addListener('click', props.clickEvent);
            }

            props.store.update({
                map: map,
                coordinates: {
                    lat: lat,
                    lng: lng
                }
            });
        }
    }, [isLoadedServiceGoogle, props.store]);

    useEffect(() => {
        if(isLoadedServiceGoogle) {
            if("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    loadMap(position.coords.latitude, position.coords.longitude, DEFAULT_COORDINATES.zoom + 3);

                }, () => {
                    loadMap(DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.zoom);
                })
            }
            else {
                loadMap(DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.zoom);
            }
        }
    }, [isLoadedServiceGoogle, loadMap]);

    return <div ref={mapRef} id="react-google-map" className="card shadow-sm">Map google</div>;
}