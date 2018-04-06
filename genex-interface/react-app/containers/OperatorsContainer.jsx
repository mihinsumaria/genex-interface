import React from 'react';
import PropTypes from 'prop-types'
import { Header, Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateOperator } from '../actions/preprocess'
import FindBestMatches from '../components/FindBestMatches.jsx'
import FindMotif from '../components/FindMotif.jsx'

class OperatorsContainer extends React.Component {

	onTabChange = (e, data) => {
		switch (data.activeIndex) {
			case 0:
				this.props.performUpdateOperator('kbest');
				break;
			case 1:
				this.props.performUpdateOperator('motif');
				break;
		}
	}

	render() {
		let params = this.props.operator['kbest'];
		let panes = [
			{
				menuItem: 'Find Best Matches', render: () => 
				<Tab.Pane>
					<FindBestMatches
						params={params}
						performUpdateOperator={this.props.performUpdateOperator}
						dataset={this.props.dataset}/>
				</Tab.Pane>
			},
			{
				menuItem: 'Find Motif', render: () => 
				<Tab.Pane>
					<FindMotif />
				</Tab.Pane>
			}
		]
		return (
			<Tab 
				menu={{size: 'tiny', attached: true, tabular: true}}
				panes={panes}
				onTabChange={this.onTabChange} />
		);
	}
};

OperatorsContainer.propTypes = {
	dataset: PropTypes.object,
	operator: PropTypes.object,
	performUpdateOperator: PropTypes.func,
};

const mapStateToProps = state => ({
	dataset: state.params.dataset,
	operator: state.params.operator,
});

const mapDispatchToProps = dispatch => ({
	performUpdateOperator(currentOperator, params) {
		dispatch(updateOperator(currentOperator, params));
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OperatorsContainer);