import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import HighchartsReact from 'highcharts-react-official'

import { MAIN_COLOR } from '../constants';
import { updateSelectedQuery } from '../actions/queryActions'

import SubsequenceSelector from '../components/SubsequenceSelector';

NoDataToDisplay(Highcharts);

class QuerySubsequenceSelectContainer extends React.Component {

	onRangeSelect = (start, end) => {
		const { selected, onQueryChange } = this.props;
		start = Math.ceil(start);
		end = Math.floor(end);
		onQueryChange(selected.type, {
			...selected[selected.type],
			start, end
		})
	}

	render() {
		const { selected, raw, dataset } = this.props;
		const queryType = selected.type;
		const start = selected[queryType].start;
		const end = selected[queryType].end;
		// Disable these things
		const [credits, tooltip, legend] = Array(3).fill({ enabled: false });
		const options = {
			chart: {
				height: 150
			},
			series: [{
				data: raw[queryType].slice(start, end),
				color: MAIN_COLOR,
				states: {
					hover: {
						enabled: false	// Disable hovering on data pont
					}
				}
			}],
			title: { text: '' },
			yAxis: {
				title: { enabled: false }, // Turn off title
			},
			credits, tooltip, legend
		}

		let seriesIndex = (queryType === 'dataset') ? selected.dataset.index : selected.upload.index;
		const seriesName = 'Series ' + dataset[seriesIndex]['name'];

		const subsequenceSelector = raw[queryType] && raw[queryType].length > 0 &&
			<SubsequenceSelector
				data={raw[queryType]}
				onRangeSelect={this.onRangeSelect}
				initStart={start}
				initEnd={end - 1}
				seriesName={seriesName}
			/>

		return (
			<div style={{ position: 'relative' }}>
				<HighchartsReact
					highcharts={Highcharts}
					constructorType={'chart'}
					options={options}
				/>
				{subsequenceSelector}
			</div>
		);
	};
};

QuerySubsequenceSelectContainer.propTypes = {
	selected: PropTypes.object,
	raw: PropTypes.object,
	dataset: PropTypes.array,
	onQueryChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	selected: state.query.selected,
	raw: state.query.raw,
	dataset: state.query.allQueries.dataset,
});

const mapDispatchToProps = dispatch => ({
	onQueryChange(queryType, params) {
		dispatch(updateSelectedQuery(queryType, params));
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuerySubsequenceSelectContainer);
