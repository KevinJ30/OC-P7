import './present.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css';
import './App.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home} from "./Pages/Home";
import {DisplayRestaurant} from "./Pages/DisplayRestaurant";
import {Stores, StoresContext} from "./Context/StoresContext";
import {restaurantStore} from "./Stores/Restaurants/RestaurantStore";
import {ADD_RESTAURANT_ACTION} from "./Stores/Restaurants/RestaurantReducer";

let routes = (
    <StoresContext.Provider value={Stores}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </div>
        </nav>

        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/restaurant/:id">
                    <DisplayRestaurant />
                </Route>
            </Switch>
        </Router>
    </StoresContext.Provider>
);

ReactDOM.render(
    routes,
    document.getElementById('root')
);

const store = restaurantStore;

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch({
    type: ADD_RESTAURANT_ACTION,
    payload: { loaded: true, data: [], dataFiltered: [], isFiltered: false }
})


store.dispatch({
    type: ADD_RESTAURANT_ACTION,
    payload: { loaded: true, data: [], dataFiltered: [], isFiltered: true }
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
