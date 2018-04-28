import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import {
	Sidebar,
	Divider,
	Header,
	Grid,
	SidebarPushable,
	Button,
	Icon
} from 'semantic-ui-react';

import reducer from './reducers';
import { HEADER_SIZE } from './constants';
import DatasetSelectAndGroup from './containers/DatasetSelectAndGroup';
import DatasetOverviewContainer from './containers/DatasetOverviewContainer';
import ResultVisualizationContainer from './containers/ResultVisualizationContainer';
import OperatorsContainer from './containers/OperatorsContainer';
import QuerySelectContainer from './containers/QuerySelectContainer';
import QuerySubsequenceSelectContainer from './containers/QuerySubsequenceSelectContainer';
import Start from './components/Start';

const Banner = (props) => (
	<div id='banner'>
		{props.children}
	</div>
);

class App extends React.Component {
	state = {
		sidebarVisible: true
	}

	onSidebarToggleClick = () => {
		this.setState({
			sidebarVisible: !this.state.sidebarVisible
		})
	}

	render() {
		const { sidebarVisible } = this.state;
		const resultAreaStyle = {
			// Change the px in `calc(...)` according to the width of Sidebar
			width: sidebarVisible ? 'calc(100% - 475px)' : '100%',
			// Overriding semantic-ui .pushable > .pusher
			transition: 'transform .5s ease,-webkit-transform .5s ease, width .5s ease'
		};
		return (
			<div className='full-view'>
				<Banner>
					<Button
						icon='sidebar'
					  floated='left'
						compact circular inverted
						onClick={this.onSidebarToggleClick}>
					</Button>
					<a href='https://www.wpi.edu/' target='_blank' 
						style={{ float: 'right', marginRight: '10px' }}>
						<img 	src='/static/wpilogo.png' width={90} />
					</a>
					<div id='title'>GENEX</div>
				</Banner>
				<Sidebar.Pushable
					className='full-view'
					style={{ height: 'calc(100% - 56px)' }}>
					<Sidebar
						animation='push'
						width='very wide'	// Remember to change resultAreaStyle.width accordingly
						visible={sidebarVisible}>
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
						<Grid style={{ padding: '15px' }}>
							<DatasetOverviewContainer />
							<ResultVisualizationContainer />
						</Grid>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
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