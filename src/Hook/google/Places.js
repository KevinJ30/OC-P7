import {loadAPI} from "./API";

export function useGetInterestForCoordinates(coordinates, type, radius, map, callback) {
    loadAPI().then(() => {
        const request = {
                 location: new window.google.maps.LatLng(44.25494, 4.64736),
                 radius:5000,
                 type: ['restaurant']
             }

        let service = new window.google.maps.places.PlacesService(map)
        service.nearbySearch(request, callback);
    })
}

function getData(results, status) {
    if(status === window.google.maps.places.PlacesServiceStatus.OK) {
        return results;
    }
}