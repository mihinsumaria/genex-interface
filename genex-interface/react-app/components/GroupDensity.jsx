import React from 'react'
import { Popup, Grid, Container, Button, Header, Statistic } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { HEADER_SIZE } from '../constants'

class GroupDensity extends React.Component {
	

	render() {
		let densityImg = '';
		let numberOfGroups = '';
		const style = {
			width: 300,
			opacity: 0.7
		};
		let info = (
			<Container textAlign='justified' style={style}>
				<p>The square plot represents clusters of sequences
					for a given similarity threshold. The multiple
					cells colored on a blue-yellow spectrum denote
					clusters of sequences. Stronger-yellow cells
					denote clusters of longer-length sequences,
					while stronger-blue cells denote shorter-length
					sequences. The area of a cell is commensurate
					with the number of sequences in the cluster.
					The size of the cells, i.e. the clusters, 
					decrease gradually from the bottom-left corner
					towards the upper-right corner. A square plot
					is 'ordered' if the color smoothly transition
					from blue to yellow going from the bottom-left
					corner to the upper-right corner.</p>
			</Container>);
		if (this.props.groups.density) {
			densityImg = (
				<div>
					<img src={this.props.groups.density} height={150} width={400} />
					<Popup
						trigger={<Button 
									onClick={this.onInfoClick} 
									size='mini' 
									icon='info circle' 
									circular={true} />}
						content={info}
						position='right center' />
				</div>);

			numberOfGroups =
				<Statistic horizontal size='mini'>
					<Statistic.Value style={{ 'marginLeft': '10px' }}>
						{this.props.groups.count}
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
}

GroupDensity.propTypes = {
	groups: PropTypes.object
};

export default GroupDensity;