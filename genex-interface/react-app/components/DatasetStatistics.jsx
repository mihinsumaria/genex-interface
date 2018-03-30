import React from 'react'
import { List, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'


export default function DatasetStatistics(props) {
	return (
		<div>
			<Header as='h4' icon='dashboard' dividing content='Dataset Statistics' />
			<List>
				<List.Item><b>Dataset name:</b> {props.dataset.name}</List.Item>
				<List.Item><b>Distance:</b> {props.distance}</List.Item>
				<List.Item><b>ST:</b> {props.st}</List.Item>
				<List.Item><b>Count:</b> {props.dataset.count}</List.Item>
				<List.Item><b>Groups:</b> {props.groups}</List.Item>
				<List.Item><b>Length:</b> {props.dataset.length}</List.Item>
				<List.Item><b>Subsequences:</b> {props.dataset.subseq}</List.Item>
			</List>
		</div>
	)
}

DatasetStatistics.propTypes = {
	dataset: PropTypes.object.isRequired,
	distance: PropTypes.string.isRequired,
	st: PropTypes.number.isRequired,
};
