import React from 'react';
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import DatasetStatistics from '../components/DatasetStatistics.jsx'


class DatasetOverviewContainer extends React.Component {
	render() {
		return (
			<DatasetStatistics dataset={this.props.dataset}
							   distance={this.props.distance}
							   st={this.props.st}/>
		)
	}
}

DatasetOverviewContainer.propTypes = {
	dataset: PropTypes.object.isRequired,
	distance: PropTypes.string.isRequired,
	st: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
	dataset: state.params.dataset,
	distance: state.params.distance,
	st: state.params.st,
});

export default connect(mapStateToProps)(DatasetOverviewContainer);
