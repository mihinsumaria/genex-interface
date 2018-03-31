import React from 'react'
import { List, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default function GroupDensity(props) {
	var densityImg = '';
	if (props.groups.density) {
		let base64Src = 'data:image/png;base64, ' + props.groups.density;
		densityImg = <img src={base64Src} height={150} width={400} />;
	}
	return (
		<div>
			<Header as='h4' icon='cubes' dividing content='Group Density' />
			{densityImg}
			{densityImg && <p>Number of groups = {props.groups.count}</p>}
		</div>
	)
}

GroupDensity.propTypes = {
	groups: PropTypes.object
};