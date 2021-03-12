import React, {useState ,useContext} from 'react';
import {Element} from "react-scroll";
import {RestaurantList} from "../Components/Restaurant/RestaurantList";
import {Map} from "../Components/Maps/Map";
import {restaurantStore, StoresContext} from "../Context/StoresContext";
import Modal from "react-modal";
import {customStyleModal} from "../CustomStyle";
import {FormAddRestaurant} from "../Forms/FormAddRestaurant";

export function Home(props) {
    const storeContext = useContext(StoresContext);

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
        restaurantStore.addRestaurants(restaurant);
        restaurantStore.notify();
    }

    return <div className="restaurant_container container pt-4">
        <div className="row">
            <div className="col-md-6">
                <h2>Retrouvez les restaurants sur la carte</h2>
                <Map store={storeContext.mapStore} clickEvent={handleClickMap} />
            </div>
            
            <div className="col-md-6">
                <Element name="anchor-list-restaurant">
                    <RestaurantList mapStore={storeContext.mapStore} />
                </Element>
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