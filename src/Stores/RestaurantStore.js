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

    /**
     * Recherche un restaurant dans le state
     *
     * @param {string} id
     * @return {Array}
     **/
    getRestaurant(id) {
        return this.state.restaurants.filter((item) => item.id === parseInt(id)).pop();
    }

}