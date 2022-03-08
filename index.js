import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'regenerator-runtime/runtime'

import store, { persistor } from './src/redux/store';
import App from './src/containers/App';

import { I18nextProvider } from 'react-i18next'
import i18n from './src/i18n/i18n';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render( 
	<I18nextProvider i18n = { i18n } >
	    <Provider store = { store } >
			<PersistGate loading={<p>Loading State...</p>} persistor={persistor}>
				<App / >
			</PersistGate>
	    </Provider> 
    </I18nextProvider>,
    document.getElementById('root')
);