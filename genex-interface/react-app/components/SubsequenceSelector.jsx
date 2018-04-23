import React from 'react'
import { Modal, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'

class SubsequenceSelector extends React.Component {
  state = { modalOpen: false }

  range = {
    start: -1,
    end: -1
  }

  openModal = () => {
    this.range = {
      start: this.props.initStart,
      end: this.props.initEnd
    }
    this.setState({ modalOpen: true });
  }

  closeModal = () => this.setState({ modalOpen: false })

  updateRange = (e) => {
    this.range = {
      start: e.min,
      end: e.max,
    }
  }

  render() {
    const { 
      data,
      onRangeSelect,
      initStart,
      initEnd,
      seriesName,
      isLoading,
    } = this.props;

    const options = {
      title: { text: '' },
      series: [{
        name: seriesName,
        data: data,
        events: {
          legendItemClick: () => (false)
        },
        animation: {
          duration: 500,
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
        // so just disable it since we don't need it anyways.
        xAxis: {
          visible: false
        }
      },
      xAxis: {
        events: {
          afterSetExtremes: this.updateRange
        },
        min: initStart,
        max: initEnd,
      },
      yAxis: {
        title: {
          enabled: false
        }
      }
    }

    const Overlay = (props) => (
      props.loading ?
        <Dimmer active inverted>
          <Loader />
        </Dimmer> 
        : <div onClick={this.openModal} className='overlay'/>
    );

    return (
      <Modal
        trigger={<Overlay loading={isLoading} />}
        open={this.state.modalOpen}
        onClose={this.closeModal}
      >
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
            this.closeModal();
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
  initStart: PropTypes.number,
  initEnd: PropTypes.number,
  seriesName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default SubsequenceSelector;