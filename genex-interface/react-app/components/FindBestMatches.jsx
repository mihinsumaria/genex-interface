import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

export default function FindBestMatches(props) {

	const handleChange = (e, { name, value }) => {
		props.performUpdateOperator(name, { k: parseInt(value) });
	}

	return (
		<Form.Input
			inline label='K = '
			type='number'
			size='small'
			name='kbest'
			disabled={props.dataset.ID === ''}
			min={1}
			max={props.dataset.subseq}
			step={1}
			defaultValue={props.params.k}
			onChange={handleChange} />
	);

}

FindBestMatches.propTypes = {
	params: PropTypes.object,
	performUpdateOperator: PropTypes.func,
	subseq: PropTypes.number,
};
