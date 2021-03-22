import React, {useState, useEffect} from 'react';
import {mapRestaurantStoreToState} from "../Stores/Restaurants/RestaurantStore";
import {connect} from "react-redux";
import {FILTER_RESTAURANT_ACTION} from "../Stores/Restaurants/RestaurantReducer";

export function FormFilterRestaurantStore({filtered_restaurants}) {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(5);

    useEffect(() => {
        filtered_restaurants({
            min: min,
            max: max
        });
    }, [filtered_restaurants, min, max])

    function handleMinChange(event) {
        if(event.target.value >= 0 && event.target.value <= 5) {
            setMin(parseInt(event.target.value));
        }
    }

    function handleMaxChange(event) {
        if(event.target.value >= 0 && event.target.value <= 5) {
            setMax(parseInt(event.target.value));
        }
    }

    return <div className="card restaurant-filter">
        <div className="card-body">
            <h3 className="card-title">Filtrer les restaurants</h3>
            <div className="form-group">
                <label htmlFor="min">Etoile minimum</label>
                <input type="number" className="form-control" name="number" placeholder="0" value={min}
                       onChange={handleMinChange} />
            </div>
            <div className="form-group">
                <label htmlFor="min">Etoile maximum</label>
                <input type="number" className="form-control" name="number" placeholder="0" value={max}
                       onChange={handleMaxChange}/>
            </div>
        </div>
    </div>;
}

export const FormFilterRestaurant = connect(
    mapRestaurantStoreToState,
    (dispatch) => ({
        filtered_restaurants: filter => dispatch({
            type: FILTER_RESTAURANT_ACTION,
            payload: {
                filter: filter
            }
        })
    })
)(FormFilterRestaurantStore);