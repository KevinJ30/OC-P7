export class RestaurantEntity {
    constructor(name, rating, position, address, placeId, reviews, photos) {
        this.name = name;
        this.rating = rating;
        this.geometry = { location: position };
        this.placeId = placeId;
        this.address = address;
        this.reviews = reviews;
        this._photos = photos;
    }

    /**
     * @returns {string} name : Nom du restaurant 
     **/
    getName() {
        return this.name;
    }

    /**
     * @param {string} name : Nom du restaurant
     * @return {void}
    **/
    setName(name) {
        this.name = name;
    }

    /**
     * @returns {number} rating : Note du restaurant
     **/
     getRating() {
        return this.rating;
    }

    /**
     * @param {number} rating : Note du restaurant
     * @return {void}
    **/
    setRating(rating) {
        this.rating = rating;
    }

    /**
     * @returns {Object} position : Cordonnées géographique du restaurant
     **/
     getPosition() {
        return this.geometry.location;
    }

    /**
     * @param {number} position : Cordonnées géographique du restaurant
     * @return {void}
    **/
    setPosition(position) {
        this.position = position;
    }

    /**
     * @returns {string} placeId : id du restaurant fournie par :l'API Google
     **/
     getPlaceId() {
        return this.placeId;
    }

    /**
     * @param {string} placeId : id du restaurant fournie par l'API Google
     * @return {void}
    **/
    setPlaceId(placeId) {
        this.placeId = placeId;
    }

    /**
     * @returns {[]} reviews : Avis sur le restaurant
     **/
    getReviews() {
        return this.reviews;
    }

    /**
     * @param {[]} reviews : Tableau contenant les avis sur le restaurant
     * @return {void}
     **/
    setReviews(reviews) {
        this.reviews = reviews;
    }

    getPhotos() {
        return this._photos;
    }

    setPhotos(value) {
        this._photos = value;
    }

}