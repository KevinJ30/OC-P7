import {render, screen} from '@testing-library/react';
import {RestaurantList} from './RestaurantList';
import {RestaurantStore} from "../../Stores/RestaurantStore";
import {InDataMemoryTest} from "./InDataMemoryTest";

const store = new RestaurantStore(new InDataMemoryTest());

describe('Liste de restaurant', () => {
    it('Mount compoent on the DOM', () => {
        render(<RestaurantList store={store}/>);
    });

    it('text H2 "Liste des restaurants"', () => {
        render(<RestaurantList store={store}/>);
        const h2ElementText = screen.getByText(/Liste des restaurants/i);
        expect(h2ElementText).toBeInTheDocument();
    })

    it('list restaurant', () => {
        render(<RestaurantList store={store}/>)
        let restaurants = document.querySelectorAll('.react-restaurant')
        expect(restaurants.length).toBe(3);
    });

    it('list restaurant no register restaurant', () => {
        const store = new RestaurantStore(new InDataMemoryTest(true));

        render(<RestaurantList store={store}/>)

        const noRestaurantElement = document.querySelector('.no-react-restaurant');

        const textNoRestaurantElement = screen.getByText(/Il n'y a aucun restaurant./);
        expect(textNoRestaurantElement).toBeInTheDocument();
        expect(noRestaurantElement).not.toBe(undefined);
    })
})

