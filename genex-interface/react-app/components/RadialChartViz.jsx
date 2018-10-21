import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts/highstock';
require('highcharts/highcharts-more')(Highcharts);
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';


function resetX(xy) {
    return xy.map((v, i) => ([i, v[1]]));
}

function nth(n) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"; }

function toOrdinal(n) { return n + '<sup>' + nth(n) + '</sup>'; }

class RadialChartViz extends React.Component {
    render() {
        const {width, result, query, chartKey} = this.props;
       
        const series = result.length > 0 && [
            // Always put the query as the first series
            {
                name: query.name + ' (Query)',
                data: resetX(query.raw.slice(query.start, query.end)),
                events: {
                    legendItemClick: () => (false) // Prevent hiding the query
                },
                pointPlacement: 'on'
            },
            ...result.map((r, i) => ({
            name: r.name + ' (' + toOrdinal(i + 1) + ')',
            data: r.raw,
            pointPlacement: 'on'
            }))
        ];
        
        let options = {
            chart: {
                height: 600,
                width: width,
                polar: true,
                type: 'line'
            },
            series,
            title: { text: '' },
            yAxis: {
                title: { enabled: false }, // Turn off title
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            xAxis: {
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
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

RadialChartViz.propTypes = {
    width: PropTypes.number,
    result: PropTypes.array,
    query: PropTypes.object,
    chartKey: PropTypes.number,
};

export default RadialChartViz;