import React, {useEffect, useState, useCallback, useRef, useContext} from 'react';
import {useLoadedService, addMarkerToMap} from "../../Hook/google/API";
import {StoresContext} from "../../Context/StoresContext";
import {MarkerEntity} from "../../Models/Entity/MarkerEntity";
import {connect} from "react-redux";
import {mapRestaurantStoreToState, restaurantStore} from "../../Stores/Restaurants/RestaurantStore";
import {DEFAULT_COORDINATES, UPDATE_STORE_ACTION} from "../../Stores/Restaurants/RestaurantReducer";

export function Map(props) {
    const mapRef = useRef(null);
    const isLoadedServiceGoogle = useLoadedService();
    const {mapStore, eventManager} = useContext(StoresContext);

    /**
     * Etats du compoosant
     **/
    const [isLoadedMap, setLoadedMap] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [markers, setMarkers] = useState([]);

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

            props.init_map({
                map: map,
                coordinates: {
                    lat: lat,
                    lng: lng
                }
            });

            setLoadedMap(true);
        }
    }, [isLoadedServiceGoogle, mapStore, props.init_map]);

    useEffect(() => {
        setIsMounted(true);

        // On souscrit a l'évenemnt qui ajoute un marker
        eventManager.attach('map.createMarker', (restaurant) => {
            let markerInstance = addMarkerToMap(mapStore.state.map, restaurant.geometry.location, restaurant.title, null);
            let marker = new MarkerEntity(restaurant.geometry.location, restaurant.name, null, restaurant.placeId, markerInstance);

            setMarkers([
                ...markers,
                marker
            ]);

            console.log(markers);
        }, 0);

        eventManager.attach('map.removeMarker', (restaurant) => {
            // On recherche sont marker sur la map
            //let marker = markers.
            let marker = markers.find(marker => marker.restaurant_id === restaurant.placeId);

            if(marker) {
                // Suppression du marker sur la map
                marker.marker_instance.setMap(null);

                // Suppression de l'entité dans le state du composant
                let newMarkers = markers.filter(item => item === marker);
                setMarkers(newMarkers);
            }
        }, 0);

        return () => {
            setIsMounted(false);
        }
    }, [eventManager, mapStore, markers])

    useEffect(() => {
        if(isLoadedServiceGoogle && isMounted) {
            if("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    loadMap(position.coords.latitude, position.coords.longitude, DEFAULT_COORDINATES.zoom + 1);
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
        let listener = null;

        if(isLoadedServiceGoogle && isMounted && isLoadedMap) {
            if(props.clickEvent) {
                // Ajoute un listener sur la map
                listener = props.restaurantStore.map.addListener('click', props.clickEvent);
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
    }, [isMounted, isLoadedServiceGoogle, mapStore, props.clickEvent, isLoadedMap, props.restaurantStore])


    return <div ref={mapRef} id="react-google-map" className="card shadow-sm">Map google</div>;
}

/**
 * Connection du store redux
 **/
export const MapStore = connect(
    mapRestaurantStoreToState,
    (dispatch) => ({
        init_map: map => dispatch({
            type: UPDATE_STORE_ACTION,
            payload: {
                map: map.map,
                isLoadedMap: true,
                coordinates: map.coordinates
            }
        })
    })
)(Map);

