import React, {useState} from 'react';
import {ReviewsEntity} from "../Models/Entity/ReviewsEntity";

export function FormAddReview(props) {
    const [authorName, setAuthorName] = useState('');
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');

    function handleChangeAuthor(event) {
        setAuthorName(event.target.value);
    }

    function handleChangeRating(event) {
        setRating(event.target.value);
    }

    function handleChangeText(event) {
        setText(event.target.value);
    }

    /**
     * Evènement qui valide le formulaire d'ajout d'un avis
     * @return {void}
     **/
    function handleValidate() {
        // On ajoute la reveiw a la liste
        props.restaurantState.reviews.unshift(new ReviewsEntity(
            authorName,
            rating,
            "Il y a moins d'un mois",
            text
        ));

        props.handleCloseModal();
    }

    return <div>
            <h1>Ajouter un avis a ce restaurant</h1>

            <div className="form-group">
                <label htmlFor="authorName">Indiquer votre nom</label>
                <input type="text" className="form-control" value={authorName} placeholder="Votre nom" onChange={handleChangeAuthor} />
            </div>

            <div className="form-group">
                <label htmlFor="authorName">Indiquer le nomre étoile</label>
                <input type="text" className="form-control" value={rating} placeholder="Nomre d'étoile" onChange={handleChangeRating} />
            </div>

            <div className="form-group">
                <label htmlFor="authorName">Écrivez votre avis</label>
                <textarea className="form-control" value={text} placeholder="Insérer votre avis" onChange={handleChangeText} />
            </div>

            <button className="btn btn-primary" onClick={handleValidate}>Ajouter</button>
    </div>;

}