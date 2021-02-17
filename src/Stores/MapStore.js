export class MapStore {
    constructor() {
        this.state = {
            map: null
        }

        this.listener = [];
    }

    getAll() {
        return this.state.restaurants;
    }

    update(map) {
        this.state.map = map
        this.notify(this.state.map);
    }

    subscribe(callback) {
        this.listener.push(callback);
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