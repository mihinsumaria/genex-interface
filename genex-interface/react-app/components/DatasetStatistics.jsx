import React from 'react'
import { List, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'


export default function DatasetStatistics(props) {
	let dataset = props.dataset;
	return (
		<div>
			<Header as='h4' icon='dashboard' dividing content='Dataset Statistics' />
			<List>
				<List.Item><b>Dataset name:</b> {dataset.name}</List.Item>
				<List.Item><b>Distance:</b> {props.distance}</List.Item>
				<List.Item><b>ST:</b> {props.st}</List.Item>
				<List.Item><b>Count:</b> {dataset.count}</List.Item>
				<List.Item><b>Length:</b> {dataset.length}</List.Item>
				<List.Item><b>Subsequences:</b> {dataset.subseq}</List.Item>
			</List>
		</div>
	)
}

DatasetStatistics.propTypes = {
	dataset: PropTypes.object,
	distance: PropTypes.string,
	st: PropTypes.string,
};
