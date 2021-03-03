export class RestaurantStore {

    constructor(model) {
        this.state = {
            restaurants: model.data
        }

        this.listener = [];
    }

    getAll() {
        return this.state.restaurants;
    }

    add(restaurants) {
        this.state.restaurants = this.state.restaurants.concat(restaurants);
        this.notify();
    }

    subscribe(callback) {
        this.listener.push(callback);
    }

    notify(data) {
        this.listener.forEach((callback) => callback(data));
    }

    /**
     * Recherche un restaurant dans le state
     *
     * @param {string} id
     * @return {Array}
     **/
    getRestaurant(id) {
        return this.state.restaurants.filter((item) => item.id === parseInt(id)).pop();
    }

    /**
     * Remplace la liste existante
     *
     * @param {array} restaurants : nouvelle liste de restaurant
     **/
    updateList(restaurants) {
        this.state.restaurants = restaurants;
        this.notify();
    }
}