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
import {restaurantStore} from "./Stores/Restaurants/RestaurantStore";
import {Provider} from "react-redux";

let routes = (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <a className="navbar-brand" href="#">FOOD TRACK</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="page-title">
                <h1 className="text-center">Liste des restaurant proche de chez vous</h1>
            </div>
        </nav>

        <Router>
            <Switch>
                <Provider store={restaurantStore}>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/restaurant/:id">
                        <DisplayRestaurant />
                    </Route>
                </Provider>
            </Switch>
        </Router>
    </div>
);

ReactDOM.render(
    routes,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
