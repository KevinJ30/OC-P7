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
    const newState = state;

    newState.data = [
        ...state.data,
        restaurants.data
    ];

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