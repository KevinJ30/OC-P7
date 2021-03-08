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

Modal.setAppElement('#root');

export function Restaurant(props) {
    const storeContext = useContext(StoresContext);
    const [isLoadedMap, setIsLoadedMap] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const {id} = useParams();
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        storeContext.mapStore.subscribe(() => {
            setIsLoadedMap(true);
        });
    }, [storeContext.mapStore])

    useEffect(() => {
        const fields = [
            "name",
            "formatted_address",
            "place_id",
            "geometry",
            "reviews",
            "rating",
            "photos"
        ];

        if(isLoadedMap) {
            getDetailsInterest(id, fields, storeContext.mapStore.state.map, (result, status) => {
                setRestaurant(result);

                let position = new window.google.maps.LatLng(
                    result.geometry.location.lat(),
                    result.geometry.location.lng(),
                );

                // Ajouter le marker sur la map
                addMarkerToMap(storeContext.mapStore.state.map, position, result.name);
                
                // On charge les photos directement
                setPhotos(result.photos);

                // On centre la map sur le point
                storeContext.mapStore.setCenterMap(result.geometry.location.lat(), result.geometry.location.lng())
            });

        }
    }, [id, isLoadedMap, storeContext.mapStore]);

    function drawReviews(restaurant) {
        if(Object.keys(restaurant).length) {
            return restaurant.reviews.map((review) => {
                const key = review.author_name + review.time;
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

    function drawPhotos(photos) {
        if(photos) {
            return photos.map((photo) => <img class="react-img-restaurant" src={photo.getUrl()} />)
        }
    }

    return <div className="container mt-3">
        <Link to="/">Home</Link>

        <div className="d-flex justify-content-between">

            <div className="title">

                <h1>{restaurant.name}</h1>
                <div className="d-flex mb-3">
                    <Stars stars={restaurant.rating} />
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
                    { drawPhotos(photos) }
                </div>
            </div>
        </div>
        

        <div className="mt-3">
            { drawReviews(restaurant) }
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