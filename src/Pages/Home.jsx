import React, {useContext} from 'react';
import {Element} from "react-scroll";
import {RestaurantList} from "../Components/Restaurant/RestaurantList";
import {Map} from "../Components/Maps/Map";
import {StoresContext} from "../Context/StoresContext";

export function Home(props) {
    const storeContext = useContext(StoresContext);

    return <div className="restaurant_container container pt-4">
        <div className="row">
            <div className="col-md-6">
                <Element name="anchor-list-restaurant">
                    <RestaurantList store={storeContext.store} mapStore={storeContext.mapStore} />
                </Element>
            </div>

            <div className="col-md-6">
                <h2>Retrouvez les restaurants sur la carte</h2>
                <Map store={storeContext.mapStore} />
            </div>
        </div>
    </div>;
}