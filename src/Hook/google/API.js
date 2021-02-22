import {Loader} from "@googlemaps/js-api-loader";
import config from "../../config.json";

/**
 * Return Load API Google
 * @returns {Promise<void>}
 **/
export function loadAPI() {
    const loaderGoogle = new Loader({
        apiKey: config.API_KEY,
        version: "weekly",
        libraries: ['places']
    })

    return loaderGoogle.load();
}