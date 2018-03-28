import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'
import DatasetSelectAndGroup from './containers/DatasetSelectAndGroup'
import DatasetOverviewContainer from './containers/DatasetOverviewContainer'

const App = () => (
    	<div>
    		<DatasetSelectAndGroup />
    		<DatasetOverviewContainer />
    		<div>something</div>
    	</ div>
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