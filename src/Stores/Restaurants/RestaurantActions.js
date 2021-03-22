/**
 * Remplace les données existante dans le tableau de données
 *
 * @param {{}} state Etat du store
 * @param {[]}  restaurants Tableau contenant totus les restaurants a ajouté
 * @return {{}} Retourne un nouvelle état
 **/
export function store_restaurants(state, payload) {
    const newState = state;
    newState.data = payload.restaurants
    newState.dataFiltered = payload.restaurants
    return newState;
}

/**
 * Action ajouter un resturant dans le state
 *
 * @param {{}} state Etat du store
 * @param {{data}}  restaurants  Tableau de restaurants
 * @return {{}} Retourne un nouvelle état
 **/
export function add_restaurant(state, restaurants) {
    let newState = state;

    newState = {
        ...state,
        data: [
            ...state.data,
            restaurants.data
        ],
        dataFiltered: [
            ...state.dataFiltered,
            restaurants.data
        ]
    };

    return newState;
}

/**
 * Supprimer un restaurant
 *
 * @param {{data}} state Etat du store
 * @param {{restaurant}} payload Informations envoyer a l'action
 **/
export function remove_restaurant(state, payload) {
    const newState = state;
    const data = state.data;

    newState.data = data.filter(item => item !== payload.restaurant);

    return newState;
}

/**
 * Mise a jour de l'état
 *
 * @param state  Etat du store
 * @param payload  Information passer au store
 * @returns {Object} Nouveau store générer
 **/
export function update_restaurant_action(state, payload) {
    return {
        ...state,
        ...payload
    }
}

/**
 * Filtre les données avec les inforamtions du filtre
 *
 * @param state Etat du store
 * @param payload : Information du filtre
 * @returns {Object} Nouveau store avec les données filtrée
 **/
export function filter_restaurant_action(state, {filter}) {
    const dataFiltered = state.data.filter(restaurant => restaurant.rating >= filter.min && restaurant.rating <= filter.max)
    const newState = state;

    newState.dataFiltered = dataFiltered;

    return {
        ...state,
        ...newState
    };
}

/**
 * Calcule le nouvelle note du restaurant en ajoutant un avis
 *
 * @param state
 * @param restaurant
 **/
export function gradeRestaurantCalculate(state, {restaurant}) {
    const restaurantNewGrade = state.data.map(restaurant => () => {
        return restaurant;
    })

    console.log(restaurantNewGrade);
}