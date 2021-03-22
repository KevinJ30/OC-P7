import React, {useState} from 'react';
import {RestaurantListStore} from "../Components/Restaurant/RestaurantList";
import {MapStore} from "../Components/Maps/Map";
import Modal from "react-modal";
import {customStyleModal} from "../CustomStyle";
import {FormFilterRestaurant} from "../Forms/FormFilterRestaurant";
import {connect} from "react-redux";
import {mapRestaurantStoreToState} from "../Stores/Restaurants/RestaurantStore";
import {ADD_RESTAURANT_ACTION} from "../Stores/Restaurants/RestaurantReducer";
import {FormAddRestaurant} from "../Forms/FormAddRestaurant";

export function HomeStored(props) {
    /**
     * Etat du composant
     **/
    const [displayModal, setDisplayModal] = useState(false);
    const [positionClick, setPositionClick] = useState(null);
    const [addressLocalisationClick, setAddressLocalisationClick] = useState(null);

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
        props.add_restaurant(restaurant)
    }

    return  <div className="restaurant_container container-fluid">
        <div className="row pt-4">
            <div className="col-md-2 container-restaurant-filter">
                <FormFilterRestaurant />
            </div>

            <div className="col-md-5 col-google-map">
                <MapStore clickEvent={handleClickMap} />
            </div>

            <div className="col-md-5 col-restaurant-list">
                <RestaurantListStore />
                {/*<RestaurantList filter={filter} handleUpdateRestaurant={setRestaurants} />*/}
            </div>
        </div>

        {/*Création de la modal */}
        <Modal
            isOpen={displayModal}
            onRequestClose={closeModal}
            style={customStyleModal}
            contentLabel="ajouter un avis">

            <FormAddRestaurant handleCloseModal={closeModal} handleClick={modalHandleClick} handle
                               positionClick={positionClick} addressLocalisationClick={addressLocalisationClick}/>
        </Modal>
    </div>;
}

// Connection du store redux
export const Home = connect(
    mapRestaurantStoreToState,
    (dispatch) => ({
        add_restaurant: restaurant => dispatch({
            type: ADD_RESTAURANT_ACTION,
            payload: {
                data: restaurant
            }
        })
    })
)(HomeStored);