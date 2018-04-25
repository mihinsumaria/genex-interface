import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { Sidebar, Segment, Divider, Header, Grid, SidebarPushable } from 'semantic-ui-react';

import reducer from './reducers';
import { HEADER_SIZE } from './constants';
import DatasetSelectAndGroup from './containers/DatasetSelectAndGroup';
import DatasetOverviewContainer from './containers/DatasetOverviewContainer';
import ResultVisualizationContainer from './containers/ResultVisualizationContainer';
import OperatorsContainer from './containers/OperatorsContainer';
import QuerySelectContainer from './containers/QuerySelectContainer';
import QuerySubsequenceSelectContainer from './containers/QuerySubsequenceSelectContainer';
import Start from './components/Start';

const Banner = () => (<div id='banner'>GENEX</div>);

const App = () => {
	let resultAreaStyle = { padding: '15px' };
	let sidebarPushableStyle = { display: 'table-cell', 'height': 'inherit' };
	return (
		<Sidebar.Pushable style={sidebarPushableStyle}>
			<Sidebar animation='slide along' width='very wide' visible={true} id='sidebar'>
				<Banner />
				<div id='controller'>
					<Header as={HEADER_SIZE} icon='options' dividing content='Parameters' />
					<DatasetSelectAndGroup />
					<Divider />
					<OperatorsContainer />
					<Header as={HEADER_SIZE} icon='hand pointer' dividing content='Query Selector' />
					<QuerySelectContainer />
					<Divider horizontal>Click to open subsequence selector</Divider>
					<QuerySubsequenceSelectContainer />
					<Divider />
					<Start />
					<Divider />
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