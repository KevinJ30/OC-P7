import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {MapStore} from "../Maps/Map";
import {Stars} from "./Rating";
import {Review} from "../review/Review";
import {customStyleModal} from "../../CustomStyle";
import Modal from "react-modal";
import {FormAddReview} from "../../Forms/FormAddReview";
import {RestaurantsModel} from '../../Models/RestaurantsModel';
import {addMarkerToMap} from "../../Hook/google/API";
import {mapRestaurantStoreToState} from "../../Stores/Restaurants/RestaurantStore";
import {connect} from "react-redux";

Modal.setAppElement('#root');

export function RestaurantStore(props) {
    /**
     * Etat du composant
     **/
    const [isMounted, setIsMounted] = useState(false);
    const [isLoadedMap, setIsLoadedMap] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const {id} = useParams();
    const [isOpenModel, setIsOpenModel] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        }
    }, [])

    useEffect(() => {
        if(props.restaurantStore.isLoadedMap) {
            setIsLoadedMap(true);
        }
    }, [props.restaurantStore.isLoadedMap])

    useEffect(() => {
        const restaurantsModel = new RestaurantsModel();

        if(isLoadedMap && isMounted) {
            restaurantsModel.getRestaurantWithReviews(props.restaurantStore.map, id).then((response) => {
                setRestaurant(response);
                // On centre et on ajoute le marker sur la map google
                props.restaurantStore.map.setCenter(response.geometry.location);
                addMarkerToMap(props.restaurantStore.map, response.geometry.location, response.name);
            })
        }
    }, [props.restaurantStore.map, isMounted, id, isLoadedMap]);

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
            if(photos) {
                return photos.map((photo) => <img key={photo.getUrl()} className="react-img-restaurant" src={photo.getUrl()} alt={photo.getUrl()} />)
            }

            return <div>Aucune photo trouvé pour ce restaurant.</div>;
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
                <MapStore  />
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

            <FormAddReview handleCloseModal={closeModal} restaurantState={restaurant} handleStateRestaurant={setRestaurant} />
        </Modal>
    </div>;
}

export const Restaurant = connect(
    mapRestaurantStoreToState
)(RestaurantStore);