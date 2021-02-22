import './present.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css';
import './App.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min';


import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home} from "./Pages/Home";
import {DisplayRestaurant} from "./Pages/DisplayRestaurant";
import {Stores, StoresContext} from "./Context/StoresContext";

let routes = (
    <Router>
        <Switch>
            <Route exact path="/">
                <StoresContext.Provider value={Stores}>
                    <Home />
                </StoresContext.Provider>
            </Route>
            <Route path="/restaurant/:id">
                <StoresContext.Provider value={Stores}>
                    <DisplayRestaurant />
                </StoresContext.Provider>
            </Route>
        </Switch>
    </Router>
);

ReactDOM.render(
    routes,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
