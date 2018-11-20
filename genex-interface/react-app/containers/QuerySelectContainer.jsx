import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  requestGetSequence,
  updateSelectedQuery,
  updateSelectedQueryRawData,
  uploadQuery
} from '../actions/queryActions';
import QueryTable from '../components/QueryTable.jsx';
import QueryUploader from '../components/QueryUploader.jsx';

class QuerySelectContainer extends React.Component {

  onTabChange = (e, data) => {
    switch (data.activeIndex) {
      case 0:
        this.props.onQueryTypeChange('dataset');
        break;
      case 1:
        this.props.onQueryTypeChange('upload');
        break;
    }
  }

  render() {
    const {
      allQueries,
      selected,
      onFromDatasetRowClick,
      onUploadRowClick,
      uploadQuery
    } = this.props;

    let panes = [
      {
        menuItem: 'From Dataset', render: () =>
          <Tab.Pane>
            <QueryTable
              queries={allQueries.dataset}
              rowClickHandler={onFromDatasetRowClick}
              selectedIndex={selected.dataset.index} />
          </Tab.Pane>
      },
      {
        menuItem: 'Upload', render: () =>
          <Tab.Pane>
            <QueryUploader onSubmit={uploadQuery} />
            <QueryTable
              queries={allQueries.upload}
              rowClickHandler={onUploadRowClick}
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
  allQueries: PropTypes.object,
  selected: PropTypes.object,
  onQueryTypeChange: PropTypes.func,
  onFromDatasetRowClick: PropTypes.func,
  onUploadRowClick: PropTypes.func,
  uploadQuery: PropTypes.func
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
    updateSelectedQuery,
    updateSelectedQueryRawData,
    requestGetSequence,
    uploadQuery
  }, dispatch)
);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { dataset, distance, st, selected, allQueries } = propsFromState;
  const { 
    updateSelectedQuery,
    updateSelectedQueryRawData,
    requestGetSequence,
    uploadQuery
  } = propsFromDispatch;

  return {
    selected, allQueries, uploadQuery,
    onQueryTypeChange: updateSelectedQuery,

    onFromDatasetRowClick: (index) => {
      updateSelectedQuery('dataset', {
        index: index,
        start: 0,
        end: allQueries.dataset[index].length,
      });
      requestGetSequence(dataset.ID, distance, st, index);
    },

    onUploadRowClick: (index) => {
      const raw = allQueries.upload[index].raw.slice();
      updateSelectedQuery('upload', {
        index: index,
        start: 0,
        end: raw.length,
      });
      updateSelectedQueryRawData('upload', raw);
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuerySelectContainer);