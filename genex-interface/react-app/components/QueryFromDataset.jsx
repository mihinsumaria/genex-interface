import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { SelectableImageCell, SelectableTextCell } from './cells'
import PropTypes from 'prop-types';

import 'fixed-data-table-2/dist/fixed-data-table.css';

class QueryFromDataset extends React.Component {
  render() {
    const { dataset, selectedIndex, rowClickHandler } = this.props;
    const onRowClick = (e, rowIndex) => {
      rowClickHandler(rowIndex);
    }
    return (
      <Table
        rowHeight={50}
        rowsCount={this.props.dataset.length}
        width={420}
        height={300}
        headerHeight={50}
        onRowClick={onRowClick} >
        <Column
          header={<Cell>Name</Cell>}
          columnKey="name"
          cell={<SelectableTextCell data={dataset} selectedIndex={selectedIndex} />}
          fixed={true}
          width={60} />
        <Column
          columnKey="thumbnail"
          header={<Cell>Preview</Cell>}
          cell={
            <SelectableImageCell data={dataset} selectedIndex={selectedIndex}
              style={{ borderBottom: "1px solid rgba(34,36,38,.15)" }}
              height={50}
              width={500} />
          }
          flexGrow={1}
          width={300} />
      </Table>
    );
  }
}

QueryFromDataset.propTypes = {
  dataset: PropTypes.array,
  rowClickHandler: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default QueryFromDataset;