import {useState} from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {FormAddReview} from "./FormAddReview";

describe("Formulaire d'ajout d'un avis", () => {
    it("Doit afficher le formulaire vide", () => {
        render(<FormAddReview />)

        let inputElements = document.querySelectorAll('input');
        let messageInput = document.querySelector('textarea');

        let inputFilled = 0;

        inputElements.forEach((input) => {
            if(input.value) {
                inputFilled++;
            }
        });

        if(messageInput.value) {
            inputFilled++
        }

        expect(inputFilled).toBe(0);
    })

    it('Doit ajouter un avis a la soumission du formmulaire.', () => {
        const handleCloseModal = jest.fn();
        let restaurant = {
            reviews: []
        };

        const {getByText} = render(<FormAddReview handleCloseModal={handleCloseModal} restaurantState={restaurant} />)

        const inputElements = document.querySelectorAll('input');
        const textareaElements = document.querySelector('textarea');
        const btnForm = document.querySelector('button.btn');


        fireEvent.change(inputElements[0], {
            target: {
                value: "test"
            }
        })

        fireEvent.change(inputElements[1], {
            target: {
                value: 2.3
            }
        })

        fireEvent.change(textareaElements, {
            target: {
                value: "Mon super avis"
            }
        })

        fireEvent.click(btnForm);

        expect(restaurant.reviews.length).toBeGreaterThan(0);
    })

    it('Champ du formulaire invalide', () => {

    })
})