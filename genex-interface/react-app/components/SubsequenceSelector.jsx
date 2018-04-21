import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'

class SubsequenceSelector extends React.Component {

  range = {
    start: -1,
    end: -1
  }

  updateRange = (e) => {
    this.range = {
      start: e.min,
      end: e.max,
    }
  }

  render() {
    const { data, onRangeSelect, initStart, initEnd } = this.props;
    const options = {
      title: { text: '' },
      series: [{
        data: data,
        events: {
          legendItemClick: () => (false)
        }
      }],
      credits: {
        enabled: false,
      },
      // Smooth scrolling
      scrollbar: {
        enabled: true
      },
      // Show the mini chart
      navigator: {
        enabled: true,
        // The xAxis of this chart shows date/time by default
        // so just diable it since we don't need it anyways.
        xAxis: {
          visible: false
        }
      },
      xAxis: {
        events: {
          afterSetExtremes: this.updateRange
        },
      },
      yAxis: {
        title: {
          enabled: false
        }
      }
    }
    return (
      <Modal trigger={<div className='overlay' />}>
        <Modal.Header>Subsequence Selector</Modal.Header>
        <Modal.Content>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'chart'}
            options={options}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => { 
            onRangeSelect(this.range.start, this.range.end); 
          }}>
            <Icon name='checkmark' /> Select
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

SubsequenceSelector.propTypes = {
  data: PropTypes.array.isRequired,
  onRangeSelect: PropTypes.func,
};

export default SubsequenceSelector;