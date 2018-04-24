import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  requestGetSequence,
  updateSelectedQuery,
  uploadQuery
} from '../actions/queryActions';
import QueryTable from '../components/QueryTable.jsx';
import QueryUploader from '../components/QueryUploader.jsx';

class QuerySelectContainer extends React.Component {

  onTabChange = (e, data) => {
    switch (data.activeIndex) {
      case 0:
        this.props.onQueryChange('dataset');
        break;
      case 1:
        this.props.onQueryChange('upload');
        break;
    }
  }

  render() {
    const {
      allQueries,
      dataset,
      selected,
      getSequenceFromDataset,
      onQueryChange,
      uploadQuery
    } = this.props;

    const fromDatasetRowClickHandler = (selectedIndex) => {
      onQueryChange('dataset', {
        index: selectedIndex,
        start: 0,
        end: dataset.length,
      });
      getSequenceFromDataset(selectedIndex);
    }

    let panes = [
      {
        menuItem: 'From Dataset', render: () =>
          <Tab.Pane>
            <QueryTable
              queries={allQueries.dataset}
              rowClickHandler={fromDatasetRowClickHandler}
              selectedIndex={selected.dataset.index} />
          </Tab.Pane>
      },
      {
        menuItem: 'Upload', render: () =>
          <Tab.Pane>
            <QueryUploader onSubmit={uploadQuery} />
            <QueryTable
              queries={allQueries.upload}
              //rowClickHandler={fromDatasetRowClickHandler}
              selectedIndex={selected.upload.index} />

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
  getSequenceFromDataset: PropTypes.func.isRequired,
  uploadQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dataset: state.params.dataset,
  distance: state.params.distance,
  st: state.params.st,
  allQueries: state.query.allQueries,
  selected: state.query.selected,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onQueryChange: updateSelectedQuery,
    getSequenceFromDataset: requestGetSequence,
    uploadQuery
  }, dispatch)
);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { dataset, distance, st, selected, allQueries } = propsFromState;
  return {
    dataset, selected, allQueries,
    ...propsFromDispatch,
    getSequenceFromDataset: (index) => {
      propsFromDispatch.getSequenceFromDataset(
        dataset.ID,
        distance,
        st,
        index)
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuerySelectContainer);