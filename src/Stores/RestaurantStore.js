export class RestaurantStore {

    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.data;
    }

}