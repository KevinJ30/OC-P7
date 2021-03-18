/**
 * Action ajouter un resturant dans le state
 *
 * @param {{}} state Etat du store
 * @param {{restaurant: []}}  payload  Informations a l'action
 * @return {[]} Retourne un nouvelle état
 **/
export function add_restaurant(state, payload) {
     return [
         ...state,
         payload.restaurant
     ]
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