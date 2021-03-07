import React, {useState} from 'react';

export function FormAddRestaurant(props) {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [address, setAddress] = useState('');
    const [latLng, setLatLng] = useState('');

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeRating(event) {
        setRating(event.target.value);
    }

    function handleChangeAddress(event) {
        setAddress(event.target.value);
    }

    /**
     * Evènement qui valide le formulaire d'ajout d'un restaurant
     * @return {void}
     **/
    function handleClick() {
        props.handleClick({
            name: name,
            rating: rating,
            vicinity: address,
            geometry: {
                location: {
                    lat: props.positionClick.lat(),
                    lng: props.positionClick.lng()
                }
            }
        });

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