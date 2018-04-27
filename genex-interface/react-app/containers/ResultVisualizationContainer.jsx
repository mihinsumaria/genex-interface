import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {HEADER_SIZE, MAIN_COLOR} from '../constants'
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
        const ksim = nextProps.ksim;
        if (ksim.length !== prevState.numberOfSeries) {
            return {
                numberOfSeries: ksim.length,
                chartKey: prevState.chartKey + 1
            };
        }
        return;
    };

    render() {
        const ksim = this.props.ksim;
        const { selected, series, seriesName} = this.props;
        const type = selected.type;
        const queryStart = selected[type].start;
        const queryEnd = selected[type].end;
        let result = false;
        let options = {
            chart: {
                height: 400,
                width: 1300
            },
            series: [],
            title: {text: ''},
            yAxis: {
                title: {enabled: false}, // Turn off title
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
            /*xAxis: {
                events: {
                    afterSetExtremes: this.updateRange
                },
                min: 0,
                max: 50,
            },*/
        };
        ksim.forEach((element) => {
            result = true;
            let singleSeries = {data:[], raw:[], name: 'test'};
            let start_index = element.data.start;
            let end_index = element.data.end;
            singleSeries.data = element.raw;
            singleSeries.data = singleSeries.data.map(x => x[1]).slice(start_index, end_index);
            options.series.push(singleSeries);
        });

        //adding query to the plot
        if (result){
            let querySeries = {data:[], name: seriesName};
            querySeries.data = series;
            querySeries.data = querySeries.data.map(x => x[1]).slice(queryStart, queryEnd);
            options.series.push(querySeries);
        }


        return (
            <Grid.Row columns={1}>
                <Grid.Column width={16}>
                    <Header as={HEADER_SIZE} icon='bullseye' dividing content='Result Visualization'/>
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
                ksim: PropTypes.array,
                selected: PropTypes.object,
                series: PropTypes.array,
                seriesName: PropTypes.string,
                };

const mapStateToProps = state => {
    const ksim = state.result.ksim;
    const { selected, selectedRaw, allQueries } = state.query;
    const type = selected.type;
    const query = allQueries[type][selected[type].index];
    return {
        ksim,
        selected,
        series: selectedRaw[type],
        seriesName: query && query.name,
    }
};

export default connect(mapStateToProps)(ResultVisualizationContainer);
