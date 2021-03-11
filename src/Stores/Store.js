/**
 * @property {array} listener : Contient tous les observateur de la class
 **/
export class Store {

    constructor() {
        this.state = null;
        this.listener  = [];
    }

    /**
     * Souscrit a l'observation du changement des données
     * 
     * @param {CallableFunction} observer : Fonction d'observation
     * @return {void}
     **/
    subscribe(observer) {
        this.listener.push(observer);
    }

    /**
     * Notifie le store du changement d'état
     * 
     * @param {array} argv: tableau contenant les arguments a envoyé a l'observer 
     * @return {void}
     **/
    notify(argv = []) {
        this.listener.forEach((observer) => observer(argv));
    }

    store(state) {
        this.state = state;
    }

}