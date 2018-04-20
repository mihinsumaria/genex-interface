import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function QueryFromDataset(props) {
  let dataset = props.dataset;
  let onRowClick = (e, rowIndex) => {
    let updatedSelected = Object.assign({}, props.selected, {
      index: rowIndex
    });
    props.performUpdateSelected(updatedSelected);
  }
  return (
    <Table
      rowHeight={50}
      rowsCount={props.dataset.length}
      width={420}
      height={300}
      headerHeight={50}
      onRowClick={onRowClick} >
      <Column
        header={<Cell>Name</Cell>}
        columnKey="name"
        cell={({ rowIndex, columnKey, ...props }) => {
          return <Cell {...props}>
            {dataset[rowIndex][columnKey]}
          </Cell>
        }
        }
        fixed={true}
        width={60} />
      <Column
        columnKey="thumbnail"
        header={<Cell>Preview</Cell>}
        cell={({ rowIndex, columnKey, ...props }) => {
          let base64Src = 'data:image/png;base64, ';
          return (
            <img
              style={{ borderBottom: "1px solid rgba(34,36,38,.15)" }}
              src={base64Src + dataset[rowIndex][columnKey]}
              height={50}
              width={300} />
          )
        }
        }
        width={300} />
    </Table>
  );
}

QueryFromDataset.propTypes = {
  dataset: PropTypes.array,
  performUpdateSelected: PropTypes.func,
  selected: PropTypes.object,
};
