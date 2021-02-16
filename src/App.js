import './back.svg';
import './present.svg';
import './App.css';

import {RestaurantStore} from "./Stores/RestaurantStore";
import {RestaurantList} from "./Components/Restaurant/RestaurantList";
import {InDataMemory} from "./InDataMemory";

/** IMPORT REACT SCROLL **/
import React, {useEffect} from "react";
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const store = new RestaurantStore(new InDataMemory());

function App() {
    useEffect(() => {
        Events.scrollEvent.register('begin', () => {
            console.log('begin', arguments);
        })

        Events.scrollEvent.register('end', () => {
            console.log('end', arguments);
        })

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <div className="site-information">
                    <div className="container">
                        <h1>Trouvez le meilleur restaurant près de chez vous</h1>
                        <p>Vous chercher le restaurants le mieux noté autour de chez vous pour organiser votre sortie. Nous recherchons les meilleurs restaurants a votre place. A l’aide de votre géolocalisation et avec votre accord tous ce fait automatiquement.</p>
                        <Link activeClass="link-active" className="btn btn-primary mr-3" to="anchor-list-restaurant" spy={true} duration={500} smooth={true}><span className="icon icon_food-multiple" />Restaurant le plus proche</Link>
                        <a href="#" className="btn btn-primary"><span className="icon icon_food-multiple"></span>Tous les restaurants</a>
                    </div>
                </div>
                <div className="site-visuel">
                    <img src="present.svg" alt="presentation"/>
                </div>
            </header>

            <div className="restaurant_container container">
                <div className="row">
                    <div className="col-md-6">
                        <Element name="anchor-list-restaurant">
                            <h2>Liste des reseataurants</h2>
                            <RestaurantList store={store}/>
                        </Element>
                    </div>

                    <div className="col-md-6">
                        <h2>Retrouvez les restaurants sur la carte</h2>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default App;
