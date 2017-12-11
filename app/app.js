import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './components/App';

import './scss/style.scss';

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

