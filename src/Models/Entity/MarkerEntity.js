/**
 * Classes MarkerEntity créer par Joudrier Kevin
 *
 * @property {Object} position : Position du marker sur la map
 * @property {string} title : Titre du marker sur la map
 * @property {Object} icon : Icone du marker sur la map (regarder la documentation google map)
 **/
export class MarkerEntity {

    constructor(position, title, icon = null, restaurant_id, marker_instance) {
        this.position = position;
        this.title = title;
        this.icon = icon;
        this.restaurant_id = restaurant_id;
        this.marker_instance = marker_instance;
    }

    /**
     * @returns {Object}
     **/
    getPosition() {
        return this.position;
    }

    /**
     * @param {Object} position
     * @return {void}
     **/
    setPosition(position) {
        this.position = position;
    }

    /**
     * @returns {string} title
     **/
    getTitle() {
        return this.title;
    }

    /**
     * @param {string} title
     * @return {void}
     **/
    setTitle(title) {
        this.title = title;
    }

    /**
     * @returns {Object} icon
     **/
    getIcon() {
        return this.icon;
    }

    /**
     * @param {Object} icon
     * @return {void}
     **/
    setIcon(icon) {
        this.title = icon;
    }
}