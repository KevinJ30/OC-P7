import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Map} from "../Maps/Map";
import {StoresContext} from "../../Context/StoresContext";
import {getDetailsInterest} from "../../Hook/google/Places";

export function Restaurant(props) {
    const storeContext = useContext(StoresContext);
    const [isLoadedmap, setIsLoadedMap] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        storeContext.mapStore.subscribe(() => {
            setIsLoadedMap(true);
        });
    }, [storeContext.mapStore])

    useEffect(() => {
        if(isLoadedmap) {
            getDetailsInterest(id, ["name", "formatted_address", "place_id", "geometry", "reviews"], storeContext.mapStore.state.map)
        }
    }, [id, isLoadedmap, storeContext.mapStore.state.map]);

    return <div className="container mt-3">
        <Link to="/">Home</Link>
        <Map store={storeContext.mapStore} />

    </div>;
}