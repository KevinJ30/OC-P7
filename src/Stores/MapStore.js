export class MapStore {
    constructor() {
        this.state = {
            map: null,
            coordinates: null
        }

        this.listener = [];
    }

    getAll() {
        return this.state.restaurants;
    }

    update(newState) {
        this.state = {
            ...this.state,
            ...newState
        };

        this.notify(this.state.map);
    }

    subscribe(callback) {
        this.listener.push(callback);
    }

    unsubscribe(callback) {
        this.listener = this.listener.filter((call) => call !== callback);
    }

    notify(data) {
        this.listener.forEach((callback) => callback(data));
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