import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react'
import { requestLoadResults } from '../actions/resultActions'

class Start extends React.Component {
	
	render() {
		const {isWorking, onStartClick, datasetID, queryIndex} = this.props;
		const disabled = (datasetID === '') || (queryIndex === -1); 
		return (
			<Button
			fluid
			size='large'
			loading={isWorking}
			onClick={onStartClick}
			color='green'
			disabled={disabled}>
			START
			</Button>
		)

	}
}

Start.propTypes = {
	isWorking: PropTypes.bool,
	onStartClick: PropTypes.func,
	datasetID: PropTypes.string,
	queryIndex: PropTypes.number,
};

const mapStateToProps = state => {
	const dataset = state.params.dataset;
	const distance = state.params.distance;
	const st = state.params.st;
	const selected = state.query.selected;
	const operator = state.params.operator;
	const isWorking = state.result.isWorking;
	return {
		dataset
		, distance
		, st
		, selected
		, operator
		, isWorking
	}
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		requestLoadResults
	}, dispatch)
);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
	const { dataset, distance, st, selected, operator, isWorking } = propsFromState;
	const { requestLoadResults } = propsFromDispatch;
	const datasetID = dataset.ID;
	const queryIndex = selected[selected.type].index;
	return {
		isWorking, datasetID, queryIndex,
		onStartClick: (...props) => requestLoadResults(
			dataset
			, distance
			, st
			, operator
			, selected)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Start);