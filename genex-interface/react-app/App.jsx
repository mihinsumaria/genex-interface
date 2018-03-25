import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Sidebar, Segment } from 'semantic-ui-react'

import reducer from './reducers'
import DatasetSelectAndGroup from './containers/DatasetSelectAndGroup'
import DatasetOverviewContainer from './containers/DatasetOverviewContainer'

const App = () => (
	<Sidebar.Pushable>
		<Sidebar animation='slide along' width='wide' visible={true} id='controller'>
			<DatasetSelectAndGroup />
		</Sidebar>
		<Sidebar.Pusher id='result-area'>
			<DatasetOverviewContainer />
		</Sidebar.Pusher>
	</Sidebar.Pushable>
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