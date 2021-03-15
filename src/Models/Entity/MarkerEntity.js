export class MarkerEntity {

    constructor(marker, placeId, coordinates, title) {
        this._marker = marker;
        this._placeId = placeId;
        this._coordinates = coordinates;
        this._title = title;
    }

    getTitle() {
        return this._title;
    }

    setTitle(value) {
        this._title = value;
    }
    getCoordinates() {
        return this._coordinates;
    }

    setCoordinates(value) {
        this._coordinates = value;
    }
    getPlaceId() {
        return this._placeId;
    }

    setPlaceId(value) {
        this._placeId = value;
    }
    getMarker() {
        return this._marker;
    }

    setMarker(value) {
        this._marker = value;
    }
}