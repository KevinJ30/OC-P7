import React, {useEffect, useState, useCallback, useRef, useContext} from 'react';
import {useLoadedService, addMarkerToMap} from "../../Hook/google/API";
import {StoresContext} from "../../Context/StoresContext";

export const DEFAULT_COORDINATES = {
    lat: 48.856613,
    lng: 2.352222,
    zoom: 14
}

export function Map(props) {
    const mapRef = useRef(null);
    const isLoadedServiceGoogle = useLoadedService();
    const {mapStore, restaurantsStore} = useContext(StoresContext);

    const [isLoadedMap, setLoadedMap] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    /**
     * Etats du compoosantZ
     **/
    const [addMarker, setAddMarker] = useState(false);

    /**
     * Charge la map
     **/
    const loadMap = useCallback((lat, lng, zoom) => {
        if(isLoadedServiceGoogle) {
            const position = new window.google.maps.LatLng(lat, lng);

            let map = new window.google.maps.Map(mapRef.current, {
                center: position,
                zoom: zoom
            });

            // On ajoute un marqueur sur la map pour indiquer ou se trouve l'utilisateur
            const icon = {
                path:
                  "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                fillColor: "#175572",
                fillOpacity: 1,
                strokeWeight: 0,
                rotation: 0,
                scale: 1.5,
                anchor: new window.google.maps.Point(15, 30),
            };

            addMarkerToMap(map, {lat: lat, lng: lng}, 'Vous êtes ici !', icon)

            setLoadedMap(true);

            mapStore.update({
                map: map,
                coordinates: {
                    lat: lat,
                    lng: lng
                }
            });

            mapStore.notify();
        }
    }, [isLoadedServiceGoogle, mapStore]);

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        }
    }, [])

    useEffect(() => {
        let subscriber = null;

        if(isMounted) {
            subscriber = restaurantsStore.subscribe(() => {
                setAddMarker(true);
            });
        }

        return () => {
            if(isMounted) {
                restaurantsStore.unsubscribe(subscriber);
            }
        }
    }, [isMounted, restaurantsStore])

    useEffect(() => {
        if(isLoadedServiceGoogle && isMounted) {
            if("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    loadMap(position.coords.latitude, position.coords.longitude, DEFAULT_COORDINATES.zoom + 3);
                }, () => {
                    loadMap(DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.zoom);

                    // Ajoute un message d'erreur
                    alert("Vous n'avez activer votre géolocalisation, votre point de départ sera paris centre.");
                })
            }
        }
    }, [isMounted, isLoadedServiceGoogle, loadMap]);

    /**
     * Ajout de l'événement click  sur la carte
     **/
    useEffect(() => {
        const listener = null;

        if(isLoadedServiceGoogle && isMounted && isLoadedMap) {
            if(props.clickEvent) {
                // Ajoute un listener sur la map
                const listener = mapStore.state.map.addListener('click', props.clickEvent);
            }
        }

        return () => {
            if(isLoadedServiceGoogle && isMounted && isLoadedMap) {
                if(props.clickEvent) {
                    // Ajoute un listener sur la map
                    window.google.maps.event.removeListener(listener);
                }
            }
        }
    }, [isMounted, isLoadedServiceGoogle, mapStore, props.clickEvent, isLoadedMap])

    /**
     * Si l'etat add marker change on ajoute les marker sur la map
     **/
    useEffect(() => {

        if(isMounted) {
            restaurantsStore.state.data.forEach((restaurant) => {
                addMarkerToMap(mapStore.state.map, restaurant.getPosition(), restaurant.getName(), null)
            })
        }
    }, [mapStore, restaurantsStore ,addMarker])

    return <div ref={mapRef} id="react-google-map" className="card shadow-sm">Map google</div>;
}