import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ResultTable from '../components/ResultTable.jsx'

import ReactResizeDetector from 'react-resize-detector';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

import { HEADER_SIZE, MAIN_COLOR } from '../constants'

NoDataToDisplay(Highcharts);

function resetX(xy) {
  return xy.map((v, i) => ([i, v[1]]));
}

// Generate 1st, 2nd, 3rd, etc. (https://stackoverflow.com/a/39466341/9394418)
function nth(n) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"; }

function toOrdinal(n) { return n + '<sup>' + nth(n) + '</sup>'; }

class ResultVisualizationContainer extends React.Component {
  state = {
    numberOfSeries: 0,
    chartKey: 0,
    contentWidth: 1000,
  };

  chartContainer = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const { resultInfo } = nextProps;
    const result = resultInfo[resultInfo.type].result;
    if (result.length !== prevState.numberOfSeries) {
      return {
        numberOfSeries: result.length,
        chartKey: prevState.chartKey + 1
      };
    }
    return null;
  };

  onResize = () => {
    const newWidth = this.chartContainer.current.clientWidth;
    this.setState({
      contentWidth: newWidth,
    })
  }

  render() {
    const { resultInfo } = this.props;
    const query = resultInfo[resultInfo.type].query;
    const result = resultInfo[resultInfo.type].result;

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
        width: this.state.contentWidth
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
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column width='sixteen'>
            <Header as={HEADER_SIZE} icon='bullseye' dividing content='Result Visualization - Similar Subsequences' />
            <HighchartsReact
              key={this.state.chartKey}
              highcharts={Highcharts}
              constructorType={'chart'}
              options={options}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column width='sixteen'>
            <Header as={HEADER_SIZE} icon='table' dividing content='Result Table' />
            <ResultTable
              width={this.state.contentWidth}
              result={result} />
          </Grid.Column>
        </Grid.Row>
        <div style={{width:"100%"}} ref={this.chartContainer}>
          <ReactResizeDetector handleWidth
            onResize={this.onResize}/>
        </div>
      </Grid>
    );
  };
};

ResultVisualizationContainer.propTypes = {
  resultInfo: PropTypes.object,
};

const mapStateToProps = state => ({
  resultInfo: state.result,
});

export default connect(mapStateToProps)(ResultVisualizationContainer);
