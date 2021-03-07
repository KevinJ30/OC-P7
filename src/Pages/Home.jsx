import React, {useState, useEffect,useContext} from 'react';
import {Element} from "react-scroll";
import {RestaurantList} from "../Components/Restaurant/RestaurantList";
import {Map} from "../Components/Maps/Map";
import {mapStore, StoresContext} from "../Context/StoresContext";
import Modal from "react-modal";
import {customStyleModal} from "../CustomStyle";
import {FormAddRestaurant} from "../Forms/FormAddRestaurant";
import {getInterestForCoordinates} from "../Hook/google/Places";
import {addMarkerToMap} from "../Hook/google/API";

export function Home(props) {
    const storeContext = useContext(StoresContext);
    const [displayModal, setDisplayModal] = useState(false);
    const [isLoadedMapInstance, setLoadedMapInstance] = useState(false);
    const [restaurants, setRestaurant] = useState([]);
    const [positionClick, setPositionClick] = useState(null);

    useEffect(() => {
        storeContext.mapStore.subscribe(handleChangeMap);

        return () => {
            storeContext.mapStore.unsubscribe(handleChangeMap);
        }
    }, [storeContext.mapStore])

    useEffect(() => {
        if(isLoadedMapInstance) {
            getInterestForCoordinates(storeContext.mapStore.state.coordinates, ['restaurant'], 500, storeContext.mapStore.state.map, (results) => {
                setRestaurant(results);

                // Ajout des marker sur la map
                results.forEach((interest) => {
                    addMarkerToMap(storeContext.mapStore.state.map,
                        {
                            lat: interest.geometry.location.lat(),
                            lng: interest.geometry.location.lng()
                        },

                        interest.name)
                })
            });
        }
    }, [isLoadedMapInstance, storeContext.mapStore.state.coordinates, storeContext.mapStore.state.map])

    // Quand la map est chargé on charge les données de google ou un autre service
    function handleChangeMap() {
        setLoadedMapInstance(true);
    }

    function closeModal() {
        setDisplayModal(false);
    }

    function handleClickMap(mapsMouseEvent) {
        // Ouverture de la modal
        setDisplayModal(true);
        setPositionClick(mapsMouseEvent.latLng);
    }

    function addRestaurant(restaurant) {
        setRestaurant([
            restaurant,
            ...restaurants,
        ]);

        // Ajoute le marker du nouveau resturant sur la carte et on centre la carte a cette endroit

    }

    return <div className="restaurant_container container pt-4">
        <div className="row">
            <div className="col-md-6">
                <Element name="anchor-list-restaurant">
                    <RestaurantList restaurants={restaurants} />
                </Element>
            </div>

            <div className="col-md-6">
                <h2>Retrouvez les restaurants sur la carte</h2>
                <Map store={storeContext.mapStore} clickEvent={handleClickMap} />
            </div>
        </div>

        {/*Création d'une modal*/}
        <Modal
            isOpen={displayModal}
            onRequestClose={closeModal}
            style={customStyleModal}
            contentLabel="ajouter un avis">

            <FormAddRestaurant handleCloseModal={closeModal} restaurants={restaurants} handleClick={addRestaurant} positionClick={positionClick}/>
        </Modal>
    </div>;
}