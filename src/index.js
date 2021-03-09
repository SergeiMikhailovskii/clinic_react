import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import store from './store';
import Schedule from "./components/Schedule/Schedule";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import DoctorsList from "./components/DoctorsList/DoctorsList";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/schedule/:id" component={Schedule}/>
                    <Route path="/about" component={About}/>
                    <Route path="/main" component={DoctorsList}/>
                    <Route path="/" component={Login}/>
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
