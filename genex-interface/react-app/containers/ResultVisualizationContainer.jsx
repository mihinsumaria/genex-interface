import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { HEADER_SIZE, MAIN_COLOR } from '../constants'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

NoDataToDisplay(Highcharts);

class ResultVisualizationContainer extends React.Component {
  state = {
    numberOfSeries: 0,
    chartKey: 0
  };

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

  render() {
    const { result, resultNames, query } = this.props;

    const series = result[result.type].length > 0 && [
      // Always put the query as the first series
      {
        name: query.name,
        data: query.raw.slice(query.start, query.end),
        events: {
          legendItemClick: () => (false) // Prevent hiding the query
        }
      },
      ...result[result.type].map((r) => ({
        name: resultNames[r.data.index],
        data: r.raw.slice(r.data.start, r.data.end)
      }))
    ];

    let options = {
      chart: {
        height: 400,
        width: 1300
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
        <Grid.Column width={16}>
          <Header as={HEADER_SIZE} icon='bullseye' dividing content='Result Visualization' />
        </Grid.Column>
        <HighchartsReact
          key={this.state.chartKey}
          highcharts={Highcharts}
          constructorType={'chart'}
          options={options}
        />
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
