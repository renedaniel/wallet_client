import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './containers/app/app_container';
import registerServiceWorker from './registerServiceWorker';

import { loadInitApis } from './requests/loader';

async function ready() {
    await loadInitApis();
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

ready();
registerServiceWorker();
