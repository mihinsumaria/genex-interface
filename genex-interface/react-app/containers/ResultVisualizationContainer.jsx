import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ReactResizeDetector from 'react-resize-detector';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

import { HEADER_SIZE, MAIN_COLOR } from '../constants'

NoDataToDisplay(Highcharts);

function resetX(xy) {
  return xy.map((v, i) => ([i, v[1]]));
}

class ResultVisualizationContainer extends React.Component {
  state = {
    numberOfSeries: 0,
    chartKey: 0,
    chartWidth: 2000,
  };

  chartContainer = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const result = nextProps.result;
    const resultSeries = result[result.type];
    if (resultSeries.length !== prevState.numberOfSeries) {
      return {
        numberOfSeries: resultSeries.length,
        chartKey: prevState.chartKey + 1
      };
    }
    return null;
  };

  onResize = () => {
    const newWidth = this.chartContainer.current.offsetWidth;
    this.setState({
      chartWidth: newWidth,
    })
  }

  render() {
    const { result, resultNames, query } = this.props;

    const getY = (xy) => (xy[1]);
    const series = result[result.type].length > 0 && [
      // Always put the query as the first series
      {
        name: query.name + ' (Query)',
        data: resetX(query.raw.slice(query.start, query.end)),
        events: {
          legendItemClick: () => (false) // Prevent hiding the query
        }
      },
      ...result[result.type].map((r) => ({
        name: resultNames[r.data.index],
        data: resetX(r.raw.slice(r.data.start, r.data.end))
      }))
    ];

    let options = {
      chart: {
        height: 400,
        width: this.state.chartWidth
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
    };

    return (
      <Grid.Row columns={1}>
        <Grid.Column width='sixteen'>
          <Header as={HEADER_SIZE} icon='bullseye' dividing content='Result Visualization' />
          <div ref={this.chartContainer}>
            <HighchartsReact
              key={this.state.chartKey}
              highcharts={Highcharts}
              constructorType={'chart'}
              options={options}
            />
          </div>
        </Grid.Column>
        <ReactResizeDetector handleWidth onResize={this.onResize} />
      </Grid.Row>
    );
  };
};

ResultVisualizationContainer.propTypes = {
  result: PropTypes.object,
  query: PropTypes.object
};

const mapStateToProps = state => {
  const { allQueries, selected, selectedRaw } = state.query;

  const type = selected.type;
  const { index, start, end } = selected[type];
  const name = allQueries[type][index] && allQueries[type][index].name;
  const raw = selectedRaw[type];

  const resultNames = allQueries.dataset.map((s) => (s.name));

  return {
    query: { name, raw, index, start, end },
    result: state.result,
    resultNames,
  }
};

export default connect(mapStateToProps)(ResultVisualizationContainer);
