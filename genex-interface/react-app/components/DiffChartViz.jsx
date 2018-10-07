import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

NoDataToDisplay(Highcharts);

function resetX(xy) {
    return xy.map((v, i) => ([i, v[1]]));
}

function nth(n) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"; }

function toOrdinal(n) { return n + '<sup>' + nth(n) + '</sup>'; }

function getDiff(x, y) {
    if (x.length > y.length)
        return y.map((value, i) => [i, (x[i][1] - value[1])]);
    return x.map((value, i) => [i, (value[1] - y[i][1])]);
}
class DiffChartViz extends React.Component {
    state = {
        columnSeries: 0
    };
    render() {
        const {width, result, query, chartKey} = this.props;
        const series = result.length > 0 && [
            ...result.map((r, i) => ({
                name: r.name + ' (' + toOrdinal(i + 1) + ')',
                data: getDiff(query.raw, r.raw),
                visible: this.state.columnSeries == i,
                events: {
                    legendItemClick: (data) => (
                        this.setState(
                            {
                                columnSeries: data.target.columnIndex
                            }))
                }
            }))
        ];

        let options = {
            chart: {
                height: 300,
                width: width,
                type: 'column'
            },
            series,
            title: { text: '' },
            yAxis: {
                title: { enabled: false }, // Turn off title
            },
            // Smooth scrolling
            scrollbar: {
                enabled: true
            },
            // Show the mini chart
            navigator: {
                enabled: true,
                // The xAxis of this chart shows date/time by default
                // so just disable it since we don't need it anyways.
                xAxis: {
                visible: false
                }
            },
            credits: {
                enabled: false
            },
            // plotOptions: {
            //     column: {
            //         pointWidth: 20
            //     }
            // }
        };
        
        return (
            <HighchartsReact
                key={chartKey}
                highcharts={Highcharts}
                constructorType={'chart'}
                options={options} />
        ) 
    }
}

DiffChartViz.propTypes = {
    width: PropTypes.number,
    result: PropTypes.array,
    query: PropTypes.object,
    chartKey: PropTypes.number,
};

export default DiffChartViz;