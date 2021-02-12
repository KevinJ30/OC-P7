import './App.css';
import {RestaurantStore} from "./Stores/RestaurantStore";
import {RestaurantList} from "./Components/Restaurant/RestaurantList";
import {InDataMemory} from "./InDataMemory";

const store = new RestaurantStore(new InDataMemory());

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Avis des restaurants autour de chez vous.
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
