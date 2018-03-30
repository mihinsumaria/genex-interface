import React from 'react'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types'


export default function DatasetStatistics(props) {
	return (
		<List>
			<List.Item>Dataset name: {props.dataset.name}</List.Item>
			<List.Item>Distance: {props.distance}</List.Item>
			<List.Item>ST: {props.st}</List.Item>
			<List.Item>Count: {props.dataset.count}</List.Item>
			<List.Item>Groups: {props.dataset.groups}</List.Item>
			<List.Item>Length: {props.dataset.length}</List.Item>
			<List.Item>Subsequences: {props.dataset.subseq}</List.Item>
		</List>
	)
}

DatasetStatistics.propTypes = {
	dataset: PropTypes.object.isRequired,
	distance: PropTypes.string.isRequired,
	st: PropTypes.number.isRequired,
};

//export default DatasetStatistics
