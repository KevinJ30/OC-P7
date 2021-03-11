import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Map} from "../Maps/Map";
import {StoresContext} from "../../Context/StoresContext";
import {getDetailsInterest} from "../../Hook/google/Places";
import {Stars} from "./Rating";
import {addMarkerToMap, } from "../../Hook/google/API";
import {Review} from "../review/Review";
import {customStyleModal} from "../../CustomStyle";
import Modal from "react-modal";
import {FormAddReview} from "../../Forms/FormAddReview";

import {RestaurantsModel} from '../../Models/RestaurantsModel';

Modal.setAppElement('#root');

    // Chargement des données depuis le model
    let restaurantsModel = new RestaurantsModel();

export function Restaurant(props) {
    const storeContext = useContext(StoresContext);
    const {mapStore, restaurantStore} = useContext(StoresContext);

    /**
     * Etat du composant
     **/
    const [isLoadedMap, setIsLoadedMap] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const {id} = useParams();
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [photos, setPhotos] = useState(null);
    const [state, setState] = useState([]);

    useEffect(() => {
        storeContext.mapStore.subscribe(() => {
            setIsLoadedMap(true);
        });
    }, [storeContext.mapStore])

    useEffect(() => {
        const restaurantsModel = new RestaurantsModel();
        if(isLoadedMap) {
            restaurantsModel.getRestaurantWithReviews(mapStore.state.map, id).then((response) => {
                setRestaurant(response);
            })
        }
    }, [id, isLoadedMap, mapStore]);

    function drawReviews(restaurant) {
        if(restaurant) {
            return restaurant.reviews.map((review) => {
                const key = review.getAuthor() + review.getTime();
                return <Review key={key} data={review} />;
            })
        }
    }

    function closeModal() {
        setIsOpenModel(false)
    }

    function openModal() {
        setIsOpenModel(true);
    }

    function drawPhotos(restaurant) {
        if(restaurant) {
            const photos = restaurant.getPhotos();
            return photos.map((photo) => <img key={photo.getUrl()} className="react-img-restaurant" src={photo.getUrl()} alt={photo.getUrl()} />)
        }
    }
    return <div className="container mt-3">
        <Link to="/">Home</Link>
        <div className="d-flex justify-content-between">

            <div className="title">

                <h1>{restaurant ? restaurant.getName() : null}</h1>
                <div className="d-flex mb-3">
                    <Stars stars={restaurant ? restaurant.getRating() : 0} />
                </div>

            </div>

            <div className="button">
                <button className="btn btn-primary" onClick={openModal}>Donnez votre avis</button>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <Map store={storeContext.mapStore}  />
            </div>

            <div className="col-md-6">
                <div id="react-google-streetview">
                    { drawPhotos(restaurant) }
                </div>
            </div>
        </div>


        <div className="mt-3">
            {
                drawReviews(restaurant)
            }
        </div>

        <Modal
            isOpen={isOpenModel}
            onRequestClose={closeModal}
            style={customStyleModal}
            contentLabel="ajouter un avis">

            <FormAddReview handleCloseModal={closeModal} restaurantState={restaurant} />
        </Modal>
    </div>;
}