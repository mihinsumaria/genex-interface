import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Sidebar, Menu, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateVizType } from '../actions/resultActions'

import ResultTable from '../components/ResultTable.jsx';
import LineChartViz from '../components/LineChartViz.jsx';
import DiffChartViz from '../components/DiffChartViz.jsx';
import RadialChartViz from '../components/RadialChartViz.jsx'
import ReactResizeDetector from 'react-resize-detector';

import { HEADER_SIZE, MAIN_COLOR } from '../constants';


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

  onItemClick = (e, data) => {
    this.props.onVizTypeChange(data.name);
  }

  render() {
    const { resultInfo } = this.props;
    const query = resultInfo[resultInfo.type].query;
    const result = resultInfo[resultInfo.type].result;
    const vizType = resultInfo[resultInfo.type].vizType;
    const menuItemStyle = {
      paddingTop: '2em',
      paddingBottom: '2em'
    }
    let viz = '';
    if (vizType === 'line') {
      viz = (
        <LineChartViz
          width={this.state.contentWidth}
          result={result}
          query={query}
          chartKey={this.state.chartKey}
          /> 
      );
    }
    else if (vizType === 'bar') {
      viz = (
        <DiffChartViz
          width={this.state.contentWidth}
          result={result}
          query={query}
          chartKey={this.state.chartKey}
          /> 
      )
    }
    else if (vizType === 'radial') {
      viz = (
        <RadialChartViz
          width={this.state.contentWidth}
          result={result}
          query={query}
          chartKey={this.state.chartKey}
          /> 
      )
    }
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column width='sixteen' style={{marginTop: '0.5em'}}>
            <Header as={HEADER_SIZE} icon='bullseye' dividing content='Ranked Similar Sequences' />
          </Grid.Column>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              direction='right'
              animation='slide out'
              visible
              vertical
              width='very thin' >
              <Popup
                trigger={
                  <Menu.Item 
                    as='a'
                    name='line'
                    active={vizType === 'line'} 
                    style={menuItemStyle}
                    onClick={this.onItemClick}>
                      <Icon name='chart line' size='large' />
                  </Menu.Item>}
                  content='Line Chart'
                  position='left center' />              
              <Popup
                trigger={
                  <Menu.Item
                    as='a'
                    name='bar'
                    active={vizType === 'bar'} 
                    style={menuItemStyle}
                    onClick={this.onItemClick}>
                      <Icon name='chart bar' size='large' />
                  </Menu.Item>}
                content='Difference Chart'
                position='left center' /> 
              <Popup
                trigger={
                  <Menu.Item 
                    as='a'
                    name='radial' 
                    active={vizType === 'radial'}
                    style={menuItemStyle}
                    onClick={this.onItemClick}>
                    <Icon name='sun' size='large' />
                  </Menu.Item>}
                content='Radial Chart'
                position='left center' /> 
            </Sidebar>
            <Sidebar.Pusher>
              <Grid.Column width='sixteen' style={{margin:'1em'}}>
                {viz}     
              </Grid.Column>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column width='sixteen'>
            <Header as={HEADER_SIZE} icon='table' dividing content='Tabular Representation - Ranked Similar Sequences' />
            <ResultTable
              result={result}
              query={query}
              width={this.state.contentWidth} />
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
  onVizTypeChange: PropTypes.func,
};

const mapStateToProps = state => ({
  resultInfo: state.result,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onVizTypeChange: updateVizType
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultVisualizationContainer);
