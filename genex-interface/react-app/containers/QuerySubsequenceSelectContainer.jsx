import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import HighchartsReact from 'highcharts-react-official'

NoDataToDisplay(Highcharts);

class QuerySubsequenceSelectContainer extends React.Component {
	render() {
		const { selected, data } = this.props;
		const queryType = selected.type;

		// Disable these things
		const [credits, tooltip, legend] = Array(3).fill({ enabled: false });
		const options = {
			chart: {
				height: 150
			},
			series: [{
				data: data[queryType],
				states: {
					hover: {
						enabled: false
					}
				}
			}],
			title: { text: '' },
			yAxis: {
				title: { enabled: false },
			},
			credits, tooltip, legend
		}
		return (
			<HighchartsReact
				highcharts={Highcharts}
				constructorType={'chart'}
				options={options}
			/>
		);
	};
};

QuerySubsequenceSelectContainer.propTypes = {
	selected: PropTypes.object,
	data: PropTypes.object,
};

const mapStateToProps = state => ({
	selected: state.query.selected,
	data: state.query.data,
});

export default connect(mapStateToProps)(QuerySubsequenceSelectContainer);