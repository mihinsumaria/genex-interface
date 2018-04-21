import React from 'react';
import PropTypes from 'prop-types'
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateSelected } from '../actions/queryActions'
import QueryFromDataset from '../components/QueryFromDataset.jsx'
import QueryFromUpload from '../components/QueryFromUpload.jsx'

class QuerySelectContainer extends React.Component {
  updatedSelected = (type) => {
    return Object.assign({}, this.props.selected, {
      type: type
    });
  }
  onTabChange = (e, data) => {
    switch (data.activeIndex) {
      case 0:
        this.props.performUpdateSelected(this.updatedSelected('dataset'));
        break;
      case 1:
        this.props.performUpdateSelected(this.updatedSelected('upload'));
        break;
    }
  }
  render() {
    let panes = [
      {
        menuItem: 'From Dataset', render: () =>
          <Tab.Pane>
            <QueryFromDataset
              dataset={this.props.allQueries.dataset}
              performUpdateSelected={this.props.performUpdateSelected}
              selected={this.props.selected} />
          </Tab.Pane>
      },
      {
        menuItem: 'Upload', render: () =>
          <Tab.Pane>
            <QueryFromUpload />
          </Tab.Pane>
      }
    ]
    return (
      <Tab
        menu={{ size: 'tiny', attached: true, tabular: true }}
        panes={panes}
        onTabChange={this.onTabChange} />
    );
  }
};

QuerySelectContainer.propTypes = {
  allQueries: PropTypes.object,
  selected: PropTypes.object,
  performUpdateSelected: PropTypes.func,
};

const mapStateToProps = state => ({
  allQueries: state.query.allQueries,
  selected: state.query.selected,
});

const mapDispatchToProps = dispatch => ({
  performUpdateSelected(selected) {
    dispatch(updateSelected(selected))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuerySelectContainer);