import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { TextCell } from './cells'
import PropTypes from 'prop-types';

import 'fixed-data-table-2/dist/fixed-data-table.css';

class ResultTable extends React.Component {
    render() {
        const { result, query } = this.props;
        let queryResult = {
            name: query.name,
            rank: 'Query',
            start: query.start,
            end: query.end,
            length: query.end - query.start + 1,
            distance: ''
        };
        let results = result.map((values, i) => (
            {
                name: values.name,
                rank: i + 1,
                start: values.data.start,
                end: values.data.end,
                length: values.data.end - values.data.start + 1,
                distance: values.dist
            }
        ));
        results.unshift(queryResult);
        let rowHeight = 50;
        let height = result.length ? Math.min(250, rowHeight * (results.length + 1)) : 250;
        return (
            <Table
                rowHeight={rowHeight}
                width={800}
                headerHeight={50}
                height={height}
                rowsCount={result.length} >
                <Column
                    header={<Cell>Rank</Cell>}
                    columnKey="rank"
                    cell={<TextCell data={results} />}
                    fixed={true}
                    width={120} />
                <Column
                    header={<Cell>Timeseries</Cell>}
                    columnKey="name"
                    cell={<TextCell data={results} />}
                    fixed={true}
                    width={120} />
                <Column
                    columnKey="length"
                    header={<Cell>Length</Cell>}
                    cell={<TextCell data={results} />}
                    fixed={true}
                    width={120} />
                <Column
                    columnKey="start"
                    header={<Cell>Start</Cell>}
                    cell={<TextCell data={results} />}
                    fixed={true}
                    width={120} />
                <Column
                    columnKey="end"
                    header={<Cell>End</Cell>}
                    cell={<TextCell data={results} />}
                    fixed={true}
                    width={120} />
                <Column
                    columnKey="distance"
                    header={<Cell>Distance</Cell>}
                    cell={<TextCell data={results} />}
                    fixed={true}
                    width={200} />
            </Table>
        );
    }
}

ResultTable.propTypes = {
    result: PropTypes.array,
    query: PropTypes.object,
};

export default ResultTable;