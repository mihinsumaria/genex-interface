import React from 'react';
import { Cell } from 'fixed-data-table-2';

function TextCell({
  data,
  rowIndex,
  columnKey,
  backgroundColor,
  ...props }) {
    return (
      <Cell style={{ backgroundColor }} {...props}>
        {data[rowIndex][columnKey]}
      </Cell>
    );
}

function ImageCell({
  data,
  rowIndex,
  columnKey,
  backgroundColor,
  ...props }) {
    const overlayStyle = {
      backgroundColor,
      opacity: backgroundColor && 0.5
    }
    return (
      <div>
        <div style={ overlayStyle } className='overlay' />
        <img
          style={props.style}
          src={data[rowIndex][columnKey]}
          height={props.height}
          width={props.width} />
      </div>
    )
}

function selectableCell(WrappedCell) {
  return ({ selectedIndex, ...props }) => {
    const backgroundColor = (selectedIndex === props.rowIndex) && '#bbcddb';
    return <WrappedCell backgroundColor={backgroundColor} {...props} />
  }
}

const SelectableTextCell = selectableCell(TextCell);
const SelectableImageCell = selectableCell(ImageCell);

export {
  TextCell,
  ImageCell,
  SelectableImageCell,
  SelectableTextCell,
}