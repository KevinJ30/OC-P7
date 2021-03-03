import {useEffect} from 'react';
import {useLoadedService} from "./API";

export function getInterestForCoordinates(coordinates, type, radius = 50, map, callback) {
    const request = {
        location: new window.google.maps.LatLng(coordinates.lat, coordinates.lng),
        radius:radius,
        type: type
    }

    let service = new window.google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback);
}