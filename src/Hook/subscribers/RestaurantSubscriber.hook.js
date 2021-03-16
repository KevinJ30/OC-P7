import {useContext, useEffect} from 'react';
import {StoresContext} from "../../Context/StoresContext";

export function useSubscribeRestaurantStore(handler) {
    const {restaurantsStore} = useContext(StoresContext)

    useEffect(() => {
        let subscribe = restaurantsStore.subscribe(() => {
            handler(restaurantsStore.state.data);
        })

        return () => {
            restaurantsStore.unsubscribe(subscribe);
        }
    }, [handler, restaurantsStore])

}