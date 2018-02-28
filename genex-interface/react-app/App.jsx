import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'
import DatasetSelectAndGroup from './containers/DatasetSelectAndGroup'

const App = () => (
    <DatasetSelectAndGroup />
)

const store = createStore(
	reducer,
	applyMiddleware(thunk, logger)
);

render(
	<Provider store={store}>
		<App />
	</Provider>
    , document.getElementById('app')
);