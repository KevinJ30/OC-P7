import './App.css';
import {RestaurantStore} from "./Stores/RestaurantStore";
import {InDataMemoryTest} from "./Components/Restaurant/InDataMemoryTest";
import {RestaurantList} from "./Components/Restaurant/RestaurantList";

const store = new RestaurantStore(new InDataMemoryTest());

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
