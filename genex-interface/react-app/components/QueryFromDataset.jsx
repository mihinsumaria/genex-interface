import React from 'react';
import { TextCell, ImageCell } from 'fixed-data-table-2/examples/helpers/cells';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


const rows = [
    "first row",
    "second row"
];

export default function QueryFromDataset() {
    // let dataset = props.dataset;
    return (
        <Table
            rowHeight={40}
            rowsCount={rows.length}
            width={300}
            height={120}
            headerHeight={40}>
            <Column
                header={<Cell>Name</Cell>}
                cell={<Cell>Column 1</Cell>}
                fixed={true}
                width={150}
            />
            <Column
                header={<Cell>Preview</Cell>}
                cell={<Cell>Column 2</Cell>}
                fixed={true}
                width={150}
            />
        </Table>
    );
};

// QueryFromDataset.propTypes = {};
