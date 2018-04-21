import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { Sidebar, Segment, Divider, Header, Grid } from 'semantic-ui-react'

import reducer from './reducers'
import { HEADER_SIZE } from './constants'
import DatasetSelectAndGroup from './containers/DatasetSelectAndGroup'
import DatasetOverviewContainer from './containers/DatasetOverviewContainer'
import ResultVisualizationContainer from './containers/ResultVisualizationContainer'
import OperatorsContainer from './containers/OperatorsContainer'
import QuerySelectContainer from './containers/QuerySelectContainer'

const Banner = () => (<div id='banner'>GENEX</div>);

const App = () => {
	let disableShadow = { 'boxShadow': '0 0 2px rgba(34,36,38,.15)' };
	let controllerStyle = { 'padding': '10px' };
	let resultAreaStyle = { 'padding': '15px' };
	let sidebarFullHeight = { 'display': 'table-cell', 'height': 'inherit' };
	return (
		<Sidebar.Pushable style={sidebarFullHeight}>
			<Sidebar animation='slide along' width='very wide' visible={true} style={disableShadow}>
				<Banner />
				<div style={controllerStyle}>
					<Header as={HEADER_SIZE} icon='options' dividing content='Parameters' />
					<DatasetSelectAndGroup />
					<Divider />
					<OperatorsContainer />
					<Divider />
					<QuerySelectContainer />
				</div>
			</Sidebar>
			<Sidebar.Pusher style={resultAreaStyle}>
				<Grid>
					<DatasetOverviewContainer />
					<ResultVisualizationContainer />
				</Grid>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
};

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