import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store';

// import {Provider} from 'react-redux';
// import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import App from './components/App';

import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';

const appElement = document.createElement('div');
appElement.className = "main-wrapper";
document.body.appendChild(appElement);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    appElement
);