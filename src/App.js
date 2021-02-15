import './back.svg';
import './present.svg';
import './App.css';
import {RestaurantStore} from "./Stores/RestaurantStore";
import {RestaurantList} from "./Components/Restaurant/RestaurantList";
import {InDataMemory} from "./InDataMemory";

const store = new RestaurantStore(new InDataMemory());

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="site-information">
                    <div className="container">
                        <h1>Trouvez le meilleur restaurant près de chez vous</h1>
                        <p>Vous chercher le restaurants le mieux noté autour de chez vous pour organiser votre sortie. Nous recherchons les meilleurs restaurants a votre place. A l’aide de votre géolocalisation et avec votre accord tous ce fait automatiquement.</p>
                        <a href="#" className="btn btn-primary mr-3"><span className="icon icon_food-multiple"></span>Restaurant le plus proche</a>
                        <a href="#" className="btn btn-primary"><span className="icon icon_food-multiple"></span>Tous les restaurants</a>
                    </div>
                </div>
                <div className="site-visuel">
                    <img src="present.svg" alt="presentation"/>
                </div>
            </header>

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <RestaurantList store={store}/>
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
