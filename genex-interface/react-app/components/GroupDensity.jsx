import React from 'react'
import { List, Header, Statistic } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { HEADER_SIZE } from '../constants'

export default function GroupDensity(props) {
	var densityImg = '';
	var numberOfGroups = '';
	if (props.groups.density) {
		let base64Src = 'data:image/png;base64, ' + props.groups.density;
		densityImg = <div><img src={base64Src} height={150} width={400} /></div>;
		numberOfGroups = <Statistic horizontal size='mini'>
							<Statistic.Value style={{'marginLeft': '10px'}}>
								{props.groups.count}
							</Statistic.Value>
							<Statistic.Label>groups</Statistic.Label>
						</Statistic>
	}
	return (
		<div>
			<Header as={HEADER_SIZE} icon='cubes' dividing content='Group Density' />
			{densityImg}
			{numberOfGroups}
		</div>
	);
}

GroupDensity.propTypes = {
	groups: PropTypes.object
};