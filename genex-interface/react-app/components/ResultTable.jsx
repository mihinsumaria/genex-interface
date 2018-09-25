import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { TextCell, ColorizedTextCell } from './cells'
import PropTypes from 'prop-types';

import 'fixed-data-table-2/dist/fixed-data-table.css';

class ResultTable extends React.Component {
    render() {
        const { width, result, query } = this.props;
        let COLOR_KEY = 'colorize';
        let queryResult = {
            name: query.name,
            rank: 'Query',
            start: query.start,
            end: query.end,
            length: query.end - query.start,
            distance: '',
            [COLOR_KEY]: true
        };
        let results = result.map((values, i) => (
            {
                name: values.name,
                rank: i + 1,
                start: values.data.start,
                end: values.data.end,
                length: values.data.end - values.data.start,
                distance: values.dist.toFixed(3),
                [COLOR_KEY]: values.name === query.name
            }
        ));
        results.unshift(queryResult);
        let rowHeight = 50;
        let height = result.length ? Math.min(250, rowHeight * (results.length + 1)) : 250;
        return (
            <Table
                rowHeight={rowHeight}
                width={width}
                headerHeight={50}
                height={height}
                rowsCount={result.length} >
                <Column
                    header={<Cell>Rank</Cell>}
                    columnKey="rank"
                    cell={<ColorizedTextCell data={results} colorKey={COLOR_KEY} />}
                    fixed={true}
                    flexGrow={1}
                    width={120} />
                <Column
                    header={<Cell>Timeseries</Cell>}
                    columnKey="name"
                    cell={<ColorizedTextCell data={results} colorKey={COLOR_KEY} />}
                    fixed={true}
                    flexGrow={1}
                    width={120} />
                <Column
                    columnKey="length"
                    header={<Cell>Length</Cell>}
                    cell={<ColorizedTextCell data={results} colorKey={COLOR_KEY} />}
                    fixed={true}
                    flexGrow={1}
                    width={120} />
                <Column
                    columnKey="start"
                    header={<Cell>Start</Cell>}
                    cell={<ColorizedTextCell data={results} colorKey={COLOR_KEY} />}
                    fixed={true}
                    flexGrow={1}
                    width={120} />
                <Column
                    columnKey="end"
                    header={<Cell>End</Cell>}
                    cell={<ColorizedTextCell data={results} colorKey={COLOR_KEY} />}
                    fixed={true}
                    flexGrow={1}
                    width={120} />
                <Column
                    columnKey="distance"
                    header={<Cell>Distance</Cell>}
                    cell={<ColorizedTextCell data={results} colorKey={COLOR_KEY}/>}
                    fixed={true}
                    flexGrow={1}
                    width={200} />
            </Table>
        );
    }
}

ResultTable.propTypes = {
    width: PropTypes.number,
    result: PropTypes.array,
    query: PropTypes.object,
};

export default ResultTable;