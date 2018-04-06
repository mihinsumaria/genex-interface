import React from 'react';
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { HEADER_SIZE } from '../constants'


class ResultVisualizationContainer extends React.Component {
	render() {
		return (
			<Grid.Row columns={1}>
				<Grid.Column width={16}>
					<Header as={HEADER_SIZE} icon='bullseye' dividing content='Result Visualization' />
				</Grid.Column>
			</Grid.Row>
		)
	}
}

ResultVisualizationContainer.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ResultVisualizationContainer);
