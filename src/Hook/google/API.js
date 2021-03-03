import {useState, useEffect} from 'react';
import {Loader} from "@googlemaps/js-api-loader";
import config from "../../config.json";

export const LOADER_GOOGLE = new Loader({
    apiKey: config.API_KEY,
    version: "weekly",
    libraries: ['places']
});

/**
 * Indique si l'api google est bien chargé
 *
 * @param loaderGoogle
 * @returns {boolean}
 **/
export function useLoadedService() {
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        LOADER_GOOGLE.load().then(() => {
            setLoaded(true);
        })
    }, []);

    return isLoaded;
}