import {render, screen} from '@testing-library/react';
import {RestaurantList} from "../RestaurantList";
import {mappingData} from "../../../Models/MappingData";
import {InDataMemory} from "../../../InDataMemory";
import {BrowserRouter as Router} from "react-router-dom";
import {Map} from "../../Maps/Map";
import {Stores, StoresContext} from "../../../Context/StoresContext";

const dataMemory = new InDataMemory();

describe('Liste des restaurant', () => {
    it('Rendu du composant', () => {
        render(<Router><RestaurantList /></Router>);
    })

    it('Quand des restaurant son envoyer au composant afficher on doit les affichers',  async () => {
        const data = mappingData(dataMemory.data);

        render(<Router><StoresContext.Provider value={Stores}><RestaurantList data={data} /></StoresContext.Provider></Router>)

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
