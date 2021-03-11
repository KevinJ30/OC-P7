import {Store} from '../Stores/Store';

export class RestaurantStore extends Store {

    constructor() {
        super();

        this.state = {
            loaded: false,
            data: []
        }

        this.listener = [];
    }

    /**
     * Indique si les données sont disponible dans le state
     * @return {boolean}
     **/
    isLoaded() {
        return this.state.loaded;
    }

    addRestaurants(restaurants) {
        return this.state.data = [
            ...this.state.data,
            restaurants
        ];
    }
}