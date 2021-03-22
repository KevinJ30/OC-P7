import React, {useState} from 'react';
import {ReviewsEntity} from "../Models/Entity/ReviewsEntity";

const RELATIVE_TIME = "Il y a moins d'une minute";

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

    function validate() {
        if(authorName !== '' && rating !== '' && text !== '') {
            if(authorName.length > 4 && text.length) {
                if(!isNaN(parseFloat(rating)) && rating >= 0 && rating <= 5) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Évènement qui valide le formulaire d'ajout d'un avis
     * @return {void}
     **/
    function handleSubmit() {
        if(validate()) {
            const review = new ReviewsEntity(
                authorName,
                parseFloat(rating),
                RELATIVE_TIME,
                text
            );

            const newState = props.restaurantState;

            newState.reviews = [
                review,
                ...props.restaurantState.reviews
            ];

            newState.setRating(calculateGradeRestaurant(newState.reviews));

            props.handleStateRestaurant(newState)

            props.handleCloseModal();
        }
        else {
            alert("Vous n'avez pas remplie le formulaire correctement !");
        }

    }

    function calculateGradeRestaurant(newReviews) {
        const reducer = (accumulator, currentValue) => {
            return accumulator + currentValue.getRating();
        };

        let averageGrade = newReviews.reduce(reducer, 0);
        averageGrade = averageGrade / newReviews.length;
        return averageGrade;
    }

    return <div>
        <h1>Ajouter un avis a ce restaurant</h1>

        <div className="form-group">
            <label htmlFor="authorName">Indiquer votre nom</label>
            <input type="text" className="form-control" value={authorName} placeholder="Votre nom" onChange={handleChangeAuthor}/>
        </div>

        <div className="form-group">
            <label htmlFor="authorName">Indiquer le nombre étoile</label>
            <input type="text" className="form-control" value={rating} placeholder="Nomre d'étoile" onChange={handleChangeRating} />
        </div>

        <div className="form-group">
            <label htmlFor="authorName">Écrivez votre avis</label>
            <textarea className="form-control" value={text} placeholder="Insérer votre avis" onChange={handleChangeText} />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>Ajouter</button>
    </div>;
}