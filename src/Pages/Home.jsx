import React, {useState, useContext} from 'react';
import {RestaurantList} from "../Components/Restaurant/RestaurantList";
import {Map} from "../Components/Maps/Map";
import {StoresContext} from "../Context/StoresContext";
import Modal from "react-modal";
import {customStyleModal} from "../CustomStyle";
import {FormAddRestaurant} from "../Forms/FormAddRestaurant";
import {RestaurantEntity} from "../Models/Entity/RestaurantEntity";

export function Home(props) {
    const {mapStore, restaurantsStore} = useContext(StoresContext);

    /**
     * Etat du composant
     **/
    const [displayModal, setDisplayModal] = useState(false);
    const [positionClick, setPositionClick] = useState(null);
    const [addressLocalisationClick, setAddressLocalisationClick] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [filterRestaurant, setFilterRestaurants] = useState([]);

    function closeModal() {
        setDisplayModal(false);
    }

    function handleClickMap(mapsMouseEvent) {
        // On recherhe l'adresse sur google map
        /**
         * Ajouter le tous dans la couche API
         **/
        const geocoder = new window.google.maps.Geocoder();

        const latLng = {
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng()
        };

        const request = {
            location: latLng
        };

        geocoder.geocode(request, (results, status) => {
           setAddressLocalisationClick(results[0]);
        });

        setPositionClick(mapsMouseEvent.latLng);
        setDisplayModal(true);
    }

    /**
     * Fonction d'ajout d'un restaurant passé au formulaire
     *
     * @param {RestaurantEntity} restaurant : Entité d'un restaurant
     **/
    function modalHandleClick(restaurant) {
        restaurantsStore.addRestaurants(restaurant);
        restaurantsStore.notify();
    }

    return <div className="restaurant_container container-fluid">
        <div className="row pt-4">
            <div className="col-md-6 col-google-map">
                <Map store={mapStore} clickEvent={handleClickMap} />
            </div>

            <div className="col-md-6 col-restaurant-list">
                <RestaurantList handleUpdateRestaurant={setRestaurants} />
            </div>
        </div>

        {/*Création de la modal */}
        <Modal
            isOpen={displayModal}
            onRequestClose={closeModal}
            style={customStyleModal}
            contentLabel="ajouter un avis">

            <FormAddRestaurant handleCloseModal={closeModal} handleClick={modalHandleClick} handle positionClick={positionClick} addressLocalisationClick={addressLocalisationClick} />
        </Modal>
    </div>;
}