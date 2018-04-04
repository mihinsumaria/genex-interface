import React from 'react'
import PropTypes from 'prop-types'
import { Form , Input} from 'semantic-ui-react'
import { connect } from 'react-redux'

export default function FindBestMatches(props) {

	const handleChange = (e, {name, value}) => {
		props.performUpdateOperator('kbest',{k: value})
	}
	return (
		<Form>
			<Form.Field inline> 
				<label>K = </label>
				<Input type='number'
				name="k"
				min={1}
				step={1}
				defaultValue={props.params.k}
				max={props.subseq}
				onChange={handleChange} />
			</Form.Field>
		</Form> 
	);

}

FindBestMatches.propTypes = {
	params: PropTypes.object,
	performUpdateOperator: PropTypes.func,
	subseq: PropTypes.number,
}
