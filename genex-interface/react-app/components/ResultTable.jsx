import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { TextCell } from './cells'
import PropTypes from 'prop-types';

import 'fixed-data-table-2/dist/fixed-data-table.css';

class ResultTable extends React.Component {
    render() {
        const { result } = this.props;
        let results = result.map((values) => (
            {
                name: values.name,
                index: values.data.index,
                start: values.data.start,
                end: values.data.end,
                distance: values.dist
            }
        ));
        let rowHeight = 50;
        let height = results.length ? rowHeight * (results.length + 1) : Math.max(300, rowHeight * (results.length + 1));
        return (
            <Table
                rowHeight={rowHeight}
                width={700}
                headerHeight={50}
                height={height}
                rowsCount={result.length} >
                <Column
                    header={<Cell>Name</Cell>}
                    columnKey="name"
                    cell={<TextCell data={results} />}
                    fixed={true}
                    width={120} />
                <Column
                    columnKey="index"
                    header={<Cell>Index</Cell>}
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
                    width={220} />
            </Table>
        );
    }
}

ResultTable.propTypes = {
    result: PropTypes.array,
};

export default ResultTable;