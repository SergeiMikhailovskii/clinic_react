import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/Schedule/Schedule';
import DoctorsList from './components/DoctorsList/DoctorsList';
import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <DoctorsList />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
