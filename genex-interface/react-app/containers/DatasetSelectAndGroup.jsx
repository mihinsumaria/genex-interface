import React from 'react'
import PropTypes from 'prop-types'
import { Form, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { requestLoadAndGroupDataset, requestGetAllDatasets } from '../actions/preprocess'

class DatasetSelectAndGroup extends React.Component {

    state = { dataset: '', distance: '', st: 0.3, errorMessage: '' }

    onParamChange = (e, {name, value}) => { this.setState({ [name]: value }); }
    
    onGroupClick = () => {
        if (this.state.dataset == '') {
            this.setState({ errorMessage: 'Please select a Dataset' });
            return;
        }
        if (this.state.distance == '') {
            this.setState({ errorMessage: 'Please select a Distance' });
            return;
        }
        this.setState( { errorMessage: '' });
        this.props.onGroupClick(this.state.dataset,
                                this.state.distance,
                                this.state.st);
    }

    componentDidMount() {
        // Get the list of all datasets when the component is first mounted
        this.props.getAllDatasets();
    }

    render() {
        const allDatasets  = this.props
                                 .allDatasets.map(ds => ({ key: ds.ID, text: ds.name, value: ds.ID }));
        const allDistances = this.props
                                 .allDistances.map(dist => ({ key: dist, text: dist, value: dist }));

        const { dataset, distance, st, errorMessage } = this.state;
        const hasError = errorMessage != '';
        return (
            <Form style={{margin: '20px'}} loading={this.props.isGrouping} error={hasError}>
                <Form.Select
                    label='Choose a dataset:'
                    name='dataset'
                    options={allDatasets}
                    onChange={this.onParamChange}
                    value={dataset}
                />
                <Form.Select
                    label='Choose a distance:'
                    name='distance'
                    options={allDistances}
                    onChange={this.onParamChange}
                    value={distance}
                />
                <Form.Input
                    label={`Select a similarity threshold: ${st} `}
                    min={0}
                    max={1}
                    name='st'
                    onChange={this.onParamChange}
                    step={0.1}
                    type='range'
                    value={st}
                />
                { hasError && <Message error content={errorMessage} /> }
                <Form.Button content='Group' onClick={this.onGroupClick}/>
            </Form>
        )
    }
};

DatasetSelectAndGroup.propTypes = {
    isGrouping: PropTypes.bool.isRequired,
    onGroupClick: PropTypes.func.isRequired,
    getAllDatasets: PropTypes.func.isRequired,
    allDatasets: PropTypes.array.isRequired,
    allDistances: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    isGrouping: state.params.isGrouping,
    allDatasets: state.params.allDatasets,
    allDistances: state.params.allDistances,
});

const mapDispatchToProps = dispatch => ({
    onGroupClick(dataset, distance, st) {
        dispatch(requestLoadAndGroupDataset(dataset, distance, st));
    },
    getAllDatasets() {
        dispatch(requestGetAllDatasets());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DatasetSelectAndGroup);