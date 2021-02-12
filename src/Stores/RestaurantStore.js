import {InDataMemory} from "../InDataMemory";

export class RestaurantStore {

    constructor(model) {
        this.state = {
            restaurants: model.data
        }
    }

    getAll() {
        return this.state.restaurants;
    }

    update(item, data) {
        this.state.restaurants = this.state.restaurants.map((restaurant) => {
            if(item.id === restaurant.id){
                return {...item, ...data};
            }

            return restaurant;
        });
    }
}