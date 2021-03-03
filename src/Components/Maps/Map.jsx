import React, {useEffect, useRef} from 'react';
import {useLoadedService} from "../../Hook/google/API";

export const DEFAULT_COORDINATES = {
    lat: 48.856613,
    lng: 2.352222,
    zoom: 14
}

export function Map(props) {
    const mapRef = useRef(null)
    const isLoadedServiceGoogle = useLoadedService();

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

    }, [isLoadedServiceGoogle]);

    function loadMap(lat, lng, zoom) {
        if(isLoadedServiceGoogle) {
            let map = new window.google.maps.Map(mapRef.current, {
                center: {lat: lat, lng: lng},
                zoom: zoom
            });

            props.store.update({
                map: map,
                coordinates: {
                    lat: lat,
                    lng: lng
                }
            });
        }
    }

    return <div ref={mapRef} id="react-google-map" className="card shadow-sm">Map google</div>;
}