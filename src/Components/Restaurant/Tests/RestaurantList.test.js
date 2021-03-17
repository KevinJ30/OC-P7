import {render, screen} from '@testing-library/react';
import {RestaurantList} from "../RestaurantList";
import React from "react";
import {mappingData} from "../../../Models/MappingData";
import {InDataMemory} from "../../../InDataMemory";
import {BrowserRouter as Router} from "react-router-dom";

const dataMemory = new InDataMemory();

describe('Liste des restaurant', () => {
    it('Rendu du composant', () => {
        render(<Router><RestaurantList /></Router>);
    })

    it('Quand des restaurant son envoyer au composant afficher on doit les affichers',  () => {
        const data = mappingData(dataMemory.data);

        render(<Router><RestaurantList data={data} /></Router>)

        let restaurantElement = document.querySelectorAll('.react-restaurant');
        expect(restaurantElement.length).toBe(2);
    });

    it('Quand la liste est vide il doit y avoir aucun restaurant et afficher un message', () => {
        render(<Router><RestaurantList data={[]} /></Router>)

        let restaurants = document.querySelectorAll('.react-restaurant');
        let textError = screen.getByText(/Il n'y a aucun restaurant/i);

        expect(restaurants.length).toBe(0);
        expect(textError).toBeInTheDocument();
    })
})
