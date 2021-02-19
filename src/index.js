import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import DoctorsList from './components/DoctorsList/DoctorsList';
import store from './store';
import Schedule from "./components/Schedule/Schedule";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/schedule/:id" component={Schedule}/>
                    <Route path="/" component={DoctorsList}/>
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
