import React, {useContext} from 'react';
import {StoresContext} from "../Context/StoresContext";
import {Restaurant} from "../Components/Restaurant/Restaurant";

export function DisplayRestaurant(props) {
    const storesContext = useContext(StoresContext);

    return <div>
        <Restaurant store={storesContext.store} />
    </div>;
}