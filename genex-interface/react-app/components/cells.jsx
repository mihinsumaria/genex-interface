import React from 'react';
import { Cell } from 'fixed-data-table-2';

function ColorizedTextCell({
  data,
  rowIndex,
  columnKey,
  colorKey,
  backgroundColor,
  ...props }) {
    backgroundColor = backgroundColor ? '#fff' : backgroundColor;
    function colorizeText(index, value, colorize) {
      let textStyle = {
        color: colorize ? '#df000e' : '#000000',
        fontWeight : index ? 400 : 1000
      }
      return <span style={ textStyle }>{value}</span>
    }
    return (
      <Cell style={{ backgroundColor }} {...props}>
        {colorizeText(rowIndex, data[rowIndex][columnKey], data[rowIndex][colorKey])}
      </Cell>
    );
}

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
  ColorizedTextCell,
  ImageCell,
  SelectableImageCell,
  SelectableTextCell,
}