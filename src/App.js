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

            <RestaurantList store={store}/>
        </div>
  );
}

export default App;
