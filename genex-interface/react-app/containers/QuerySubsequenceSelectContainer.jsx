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
		const { selected, series, seriesName, isLoading } = this.props;
		const type = selected.type;
		const start = selected[type].start;
		const end = selected[type].end;
		// Disable these things
		const [credits, tooltip, legend] = Array(3).fill({ enabled: false });
		const options = {
			chart: {
				height: 150
			},
			series: [{
				data: series.slice(start, end),
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

		const subsequenceSelector = series && series.length > 0 &&
			<SubsequenceSelector
				data={series}
				onRangeSelect={this.onRangeSelect}
				initStart={start}
				initEnd={end - 1}
				seriesName={seriesName}
				isLoading={isLoading}
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
	series: PropTypes.array,
	seriesName: PropTypes.string,
	onQueryChange: PropTypes.func,
	isLoading: PropTypes.bool,
};

const mapStateToProps = state => {
	const { selected, raw, allQueries } = state.query;
	const type = selected.type;
	const query = allQueries[type][selected[type].index];
	return {
		selected,
		series: raw[type],
		seriesName: query && query.name,
		isLoading: raw.isLoading
	}
};

const mapDispatchToProps = dispatch => ({
	onQueryChange(queryType, params) {
		dispatch(updateSelectedQuery(queryType, params));
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuerySubsequenceSelectContainer);
