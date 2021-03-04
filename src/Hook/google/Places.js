/**
 * Récupére la liste des points d'intêret avec google place
 *
 * @param coordinates : Cordonnées du centre pour créer le rayons de recherche
 * @param type : Type de point d'intêret que l'on recherche
 * @param radius : Rayon d'action
 * @param map : Instance de la map google
 * @param callback : Callable qui renvoie les données
 **/
export function getInterestForCoordinates(coordinates, type, radius = 50, map, callback) {
    const request = {
        location: new window.google.maps.LatLng(coordinates.lat, coordinates.lng),
        radius:radius,
        type: type
    }

    let service = new window.google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback);
}

/**
 * Récupére les détails d'un point d'intéret
 *
 * @param {string} placeId
 * @param {array} fields
 * @param {Object} map
 **/
export function getDetailsInterest(placeId, fields, map) {
    const request = {
        placeId: placeId,
        fields: fields
    };

    const service = window.google.maps.places.placeService(map);

    service.getDetails(request, (place, status) => {
        console.log(status);
    })
}