import React from 'react'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types'


export default function DatasetStatistics(props) {
	return (
		<List>
			<List.Item><b>Dataset name:</b> {props.dataset.name}</List.Item>
			<List.Item><b>Distance:</b> {props.distance}</List.Item>
			<List.Item><b>ST:</b> {props.st}</List.Item>
			<List.Item><b>Count:</b> {props.dataset.count}</List.Item>
			<List.Item><b>Groups:</b> {props.groups}</List.Item>
			<List.Item><b>Length:</b> {props.dataset.length}</List.Item>
			<List.Item><b>Subsequences:</b> {props.dataset.subseq}</List.Item>
		</List>
	)
}

DatasetStatistics.propTypes = {
	dataset: PropTypes.object.isRequired,
	distance: PropTypes.string.isRequired,
	st: PropTypes.number.isRequired,
};
