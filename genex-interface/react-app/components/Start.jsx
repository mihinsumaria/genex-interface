import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button, Checkbox, Grid } from 'semantic-ui-react'
import { requestResult } from '../actions/resultActions'
import { updateIncludeQuery } from '../actions/queryActions'

class Start extends React.Component {
	
	onCheck = (e, data) => {
		this.props.updateIncludeQuery(data.checked);
	}
	render() {
		const { isWorking, onStartClick, disabled, includeDisabled } = this.props;
		return (
			
			<Grid.Row>
				<Checkbox
					disabled={includeDisabled}
					onClick={this.onCheck}
					defaultChecked={false}
					label={'Include Query Results'} />
				<Button
					fluid positive
					size='large'
					loading={isWorking}
					onClick={onStartClick}
					disabled={disabled}>
					START
				</Button>
			</Grid.Row>
		)

	}
}

Start.propTypes = {
	isWorking: PropTypes.bool,
	onStartClick: PropTypes.func,
	disabled: PropTypes.bool,
	updateIncludeQuery: PropTypes.func,
	includeDisabled: PropTypes.bool,
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
		requestResult,
		updateIncludeQuery
	}, dispatch)
);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
	const { params, query, isWorking } = propsFromState;
	const { dataset, distance, st, operator } = params;
	const { requestResult, updateIncludeQuery } = propsFromDispatch;

	const queryIndex = query.selected[query.selected.type].index;
	// Disable if either the dataset is not loaded or no query is selected
	const disabled = (dataset.ID === '') || (queryIndex === -1);
	const includeDisabled = disabled && query.selected.type === 'upload';

	return {
		isWorking, disabled,
		updateIncludeQuery,
		includeDisabled,
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