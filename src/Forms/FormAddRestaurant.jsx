import React, {useState, useEffect} from 'react';
import {RestaurantEntity} from "../Models/Entity/RestaurantEntity";
import {mapRestaurantStoreToState} from "../Stores/Restaurants/RestaurantStore";
import {connect} from "react-redux";
import {ADD_RESTAURANT_ACTION} from "../Stores/Restaurants/RestaurantReducer";

export function FormAddRestaurantStore(props) {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [address, setAddress] = useState('');

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeRating(event) {
        setRating(event.target.value);
    }

    function handleChangeAddress(event) {
        setAddress(event.target.value);
    }

    useEffect(() => {
        if(props.addressLocalisationClick) {
            setAddress(props.addressLocalisationClick.formatted_address);
        }
    }, [props.addressLocalisationClick])

    /**
     * Evènement qui valide le formulaire d'ajout d'un restaurant
     * @return {void}
     **/
    function handleClick() {
        const restaurant = new RestaurantEntity(name, rating, {
            lat: props.positionClick.lat(),
            lng: props.positionClick.lng()
        }, address ,Date.now);

        props.add_restaurant(restaurant);

        props.handleCloseModal();
    }

    return <div>
        <h1>Ajouter votre restaurant</h1>

        <div className="form-group">
            <label htmlFor="authorName">Indiquer le nom du restaurant</label>
            <input type="text" className="form-control" value={name} placeholder="Nom du restaurant" onChange={handleChangeName} />
        </div>

        <div className="form-group">
            <label htmlFor="authorName">Indiquer le nomre étoile</label>
            <input type="text" className="form-control" value={rating} placeholder="Nombre d'étoile" onChange={handleChangeRating} />
        </div>

        <div className="form-group">
            <label htmlFor="authorName">Indiquer l'adresse du restaurant</label>
            <input className="form-control" value={address} placeholder="Indiquer l'adresse du restaurant" onChange={handleChangeAddress} />
        </div>

        <button className="btn btn-primary" onClick={handleClick}>Ajouter</button>
    </div>;
}

export const FormAddRestaurant = connect(
    mapRestaurantStoreToState,
    (dispatch) => ({
        add_restaurant: restaurant => dispatch({
            type: ADD_RESTAURANT_ACTION,
            payload: {
                data: restaurant
            }
        })
    })
)(FormAddRestaurantStore);