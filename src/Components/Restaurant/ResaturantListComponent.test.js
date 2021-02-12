import {render, screen} from '@testing-library/react';
import {RestaurantList} from './RestaurantList';
import {RestaurantStore} from "../../Stores/RestaurantStore";
import {InDataMemoryTest} from "./InDataMemoryTest";
import {RestaurantItem} from "./RestaurantItem";

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

    it("should no display restaurant if title is null", () => {
        store.update(store.state.restaurants[0], {title:null});
        render(<RestaurantList store={store} />)

        const restaurants = document.querySelectorAll('.react-restaurant');
        expect(restaurants.length).toBe(2);
    })

    it("should no display restaurant if title is empty", () => {
        store.update(store.state.restaurants[0], {title:''});
        render(<RestaurantList store={store} />)

        const restaurants = document.querySelectorAll('.react-restaurant');
        expect(restaurants.length).toBe(2);
    })
});

describe("Représentation d'un restaurant", () => {
    it("Affichage d'un restaurant", () => {
        const value = {
            title: "First restaurant",
            address: "2 impasse bagnoli, serignan du comtat 84830 sérignan-du-comtat",
            ratings: [
                {
                    stars: 4,
                    comment: "Un  excellent restaurant dans un quartier calme de la ville de sérignan-du-comtat."
                }
            ]
        }

        render(<RestaurantItem value={value} />);

        const titleTextElement = screen.getByText(/First restaurant/);
        const addressTextElement = screen.getByText(/2 impasse bagnoli, serignan du comtat 84830 sérignan-du-comtat/);
        const commentTextElement = screen.getByText(/Un excellent restaurant dans un quartier calme de la ville de sérignan-du-comtat/);

        expect(titleTextElement).toBeInTheDocument()
        expect(addressTextElement).toBeInTheDocument()
        expect(commentTextElement).toBeInTheDocument()
    });
})

