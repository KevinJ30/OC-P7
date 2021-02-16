import {RestaurantStore} from "./Stores/RestaurantStore";
import {RestaurantList} from "./Components/Restaurant/RestaurantList";
import {InDataMemory} from "./InDataMemory";

/** IMPORT REACT SCROLL **/
import { Link, Element} from 'react-scroll';

const store = new RestaurantStore(new InDataMemory());

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="header pt-3 pb-3">
                    <div className="container">
                        <input type="text" className="search-field" placeholder="search"/>
                    </div>
                </div>
                <div className="site-information">
                    <div className="header-container container d-flex justify-content-center align-items-center">
                        <div className="row">
                            <div className="col-lg-5 col-md-12 mb-5">
                                <h1 className="animate animate-fade fade-in-top">Trouvez le meilleur restaurant près de chez vous</h1>
                                <p className="animate animate-fade fade-in-left delay-1">Vous chercher le restaurants le mieux noté autour de chez vous pour organiser votre sortie. Nous recherchons les meilleurs restaurants a votre place. A l’aide de votre géolocalisation et avec votre accord tous ce fait automatiquement.</p>
                                <div className="animate animate-fade fade-in-bottom delay-2">
                                    <Link activeClass="link-active" className="btn btn-primary mr-3" to="anchor-list-restaurant" spy={true} duration={500} smooth={true}><span className="icon icon_food-multiple" />Restaurant le plus proche</Link>
                                    <a href="#" className="btn btn-primary"><span className="icon icon_food-multiple"></span>Tous les restaurants</a>
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-12">
                                <div className="site-visuel animate animate-fade fade-in-right delay-3">
                                    <img src="present.svg" alt="presentation"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="restaurant_container container">
                <div className="row">
                    <div className="col-md-6">
                        <Element name="anchor-list-restaurant">
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
