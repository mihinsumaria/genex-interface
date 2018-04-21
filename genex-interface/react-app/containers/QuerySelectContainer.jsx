import React from 'react';
import PropTypes from 'prop-types'
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { requestGetSequence, updateSelectedQuery } from '../actions/queryActions'
import QueryFromDataset from '../components/QueryFromDataset.jsx'
import QueryFromUpload from '../components/QueryFromUpload.jsx'

class QuerySelectContainer extends React.Component {

  onTabChange = (e, data) => {
    switch (data.activeIndex) {
      case 0:
        this.onQueryChange('dataset');
        break;
      case 1:
        this.onQueryChange('upload');
        break;
    }
  }

  render() {
    const {
      allQueries,
      dataset,
      distance,
      st,
      selected,
      getSequenceCreator,
      onQueryChange,
    } = this.props;

    const getSequence = getSequenceCreator(dataset.ID, distance, st);

    const fromDatasetRowClickHandler = (selectedIndex) => {
      onQueryChange('dataset', {
        index: selectedIndex,
        start: 0,
        end: dataset.length,
      });
      getSequence(selectedIndex);
    }

    let panes = [
      {
        menuItem: 'From Dataset', render: () =>
          <Tab.Pane>
            <QueryFromDataset
              dataset={allQueries.dataset}
              rowClickHandler={fromDatasetRowClickHandler}
              selectedIndex={selected.dataset.index} />
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
  dataset: PropTypes.object,
  allQueries: PropTypes.object,
  selected: PropTypes.object,
  onQueryChange: PropTypes.func.isRequired,
  getSequenceCreator: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dataset: state.params.dataset,
  distance: state.params.distance,
  st: state.params.st,
  allQueries: state.query.allQueries,
  selected: state.query.selected,
});

const mapDispatchToProps = dispatch => ({
  onQueryChange(queryType, params) {
    dispatch(updateSelectedQuery(queryType, params));
  },

  getSequenceCreator(datasetID, distance, st) {
    return (selected) => {
      dispatch(requestGetSequence(datasetID, distance, st, selected));
    }
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuerySelectContainer);