import React from 'react';
import PropTypes from 'prop-types'
import { Header, Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { updateOperator } from '../actions/preprocessActions'
import FindBestMatches from '../components/FindBestMatches.jsx'
import FindMotif from '../components/FindMotif.jsx'

class OperatorsContainer extends React.Component {

	onTabChange = (e, data) => {
		switch (data.activeIndex) {
			case 0:
				this.props.onOperatorChange('kbest');
				break;
			case 1:
				this.props.onOperatorChange('motif');
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
							onTabChange={this.props.onOperatorChange}
							dataset={this.props.dataset} />
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
				menu={{ size: 'tiny', attached: true, tabular: true }}
				panes={panes}
				onTabChange={this.onTabChange} />
		);
	}
};

OperatorsContainer.propTypes = {
	dataset: PropTypes.object,
	operator: PropTypes.object,
	onOperatorChange: PropTypes.func,
};

const mapStateToProps = state => ({
	dataset: state.params.dataset,
	operator: state.params.operator,
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		onOperatorChange: updateOperator
	}, dispatch)
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OperatorsContainer);