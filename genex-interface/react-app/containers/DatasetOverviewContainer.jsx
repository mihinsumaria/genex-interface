
import React from 'react';
import PropTypes from 'prop-types'
import { List, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import DatasetStatistics from '../components/DatasetStatistics.jsx'
import GroupDensity from '../components/GroupDensity.jsx'


class DatasetOverviewContainer extends React.Component {
	render() {
		return (
			<Grid.Row columns={2}>
				<Grid.Column width={4}>
					<DatasetStatistics 
						dataset={this.props.dataset}
						distance={this.props.distance}
						st={this.props.st}/>
				</Grid.Column>
				<Grid.Column width={12}>
					<GroupDensity groups={this.props.groups} />
				</Grid.Column>
			</Grid.Row>
		)
	}
}

DatasetOverviewContainer.propTypes = {
	dataset: PropTypes.object,
	distance: PropTypes.string,
	st: PropTypes.string,
	groups: PropTypes.object
};

const mapStateToProps = state => ({
	dataset: state.params.dataset,
	distance: state.params.distance,
	st: state.params.st,
	groups: state.params.groups
});

export default connect(mapStateToProps)(DatasetOverviewContainer);
