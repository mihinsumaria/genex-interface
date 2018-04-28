import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react'
import { requestResult } from '../actions/resultActions'

class Start extends React.Component {

	render() {
		const { isWorking, onStartClick, disabled } = this.props;
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
	disabled: PropTypes.bool,
};

const mapStateToProps = state => {
	return {
		params: state.params,
		query: state.query,
		isWorking: state.result.isWorking
	}
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		requestResult
	}, dispatch)
);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
	const { params, query, isWorking } = propsFromState;
	const { dataset, distance, st, operator } = params;
	const { requestResult } = propsFromDispatch;

	const queryIndex = query.selected[query.selected.type].index;
	// Disable if either the dataset is not loaded or no query is selected
	const disabled = (dataset.ID === '') || (queryIndex === -1);

	return {
		isWorking, disabled,
		onStartClick: () => requestResult(
			dataset
			, distance
			, st
			, operator
			, query)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Start);