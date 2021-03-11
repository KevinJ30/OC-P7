/**
 * Récupére la liste des points d'intêret avec google place
 *
 * @param coordinates : Cordonnées du centre pour créer le rayons de recherche
 * @param type : Type de point d'intêret que l'on recherche
 * @param radius : Rayon d'action
 * @param map : Instance de la map google
 * @param callback : Callable qui renvoie les données
 **/
export function getInterestForCoordinatesOld(coordinates, type, radius = 50, map, callback) {
    const request = {
        location: new window.google.maps.LatLng(coordinates.lat, coordinates.lng),
        radius:radius,
        type: type
    }

    let service = new window.google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback);
}

/**
 * Récupére la liste des points d'intêret avec google place
 *
 * @param coordinates : Cordonnées du centre pour créer le rayons de recherche
 * @param type : Type de point d'intêret que l'on recherche
 * @param radius : Rayon d'action
 * @param map : Instance de la map google
 * @param callback : Callable qui renvoie les données
 **/
 export function getInterestForCoordinates(coordinates, type, radius = 50, map) {
    // let service = new window.google.maps.places.PlacesService(map)
    // return new Promise((result)) service.nearbySearch(request, callback);
    return new Promise((resolve, reject)  => {
        const request = {
            location: new window.google.maps.LatLng(coordinates.lat, coordinates.lng),
            radius:radius,
            type: type
        }
        
        let service = new window.google.maps.places.PlacesService(map)
        service.nearbySearch(request, (response, status) => {
            if(status !== 'OK') {
                reject('Impossible de charger les données depuis google !');
            }
            else {
                resolve(response);
            }
        });
    });
}


/**
 * Récupére les détails d'un point d'intéret
 *
 * @param {string} placeId
 * @param {array} fields
 * @param {Object} map
 * @param {function} callback
 **/
export function getDetailsInterest(map, placeId, fields) {
    return new Promise((resolve, reject) => {
        const request = {
            placeId: placeId,
            fields: fields
        };
    
        const service = new window.google.maps.places.PlacesService(map);
        
        service.getDetails(request, (response, status) => {
            if(status === 'OK') {
                resolve(response);
            }
            else {
                reject('Impossible de charger les données depuis google !');
            }
        })
    });
}