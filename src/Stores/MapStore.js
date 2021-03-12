import {Store} from "./Store";

export class MapStore extends Store {
    constructor() {
        super();

        this.state = {
            map: null,
            coordinates: null
        }
    }

    getAll() {
        return this.state.restaurants;
    }

    update(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
    }

    setCenterMap(lat, lng) {
        this.state.map.setCenter({
            lat: lat,
            lng: lng,
            zoom: 8
        });

        this.notify(this.state.map);
    }
}