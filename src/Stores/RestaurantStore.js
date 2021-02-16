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
            if(item.restaurantName === restaurant.restaurantName){
                return {...item, ...data};
            }

            return restaurant;
        });
    }
}