import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';


function resetX(xy) {
    return xy.map((v, i) => ([i, v[1]]));
}

function nth(n) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"; }

function toOrdinal(n) { return n + '<sup>' + nth(n) + '</sup>'; }

class LineChartViz extends React.Component {
    render() {
        const {width, result, query, chartKey} = this.props;
       
        const series = result.length > 0 && [
            // Always put the query as the first series
            {
                name: query.name + ' (Query)',
                data: resetX(query.raw.slice(query.start, query.end)),
                events: {
                    legendItemClick: () => (false) // Prevent hiding the query
                }
            },
            ...result.map((r, i) => ({
            name: r.name + ' (' + toOrdinal(i + 1) + ')',
            data: r.raw
            }))
        ];
        
        let options = {
            chart: {
                height: 300,
                width: width
            },
            series,
            title: { text: '' },
            yAxis: {
                title: { enabled: false }, // Turn off title
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
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
        };
        
        return (
            <HighchartsReact
                key={chartKey}
                highcharts={Highcharts}
                constructorType={'chart'}
                options={options} />
        );
    }

}

LineChartViz.propTypes = {
    width: PropTypes.number,
    result: PropTypes.array,
    query: PropTypes.object,
    chartKey: PropTypes.number,
};

export default LineChartViz;