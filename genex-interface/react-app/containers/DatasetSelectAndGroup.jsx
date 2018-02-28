import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { requestLoadAndGroupDataset } from '../actions/preprocess'

class DatasetSelectAndGroup extends React.Component {

    onDatasetSelect = (e, {name, value}) => { this.setState({ [name]: value }); }
    
    onGroupClick = () => {
        if (this.state && this.state.dataset) {
            this.props.onGroupClick(this.state.dataset);
        }
    }

    render() {
        const datasets = ['dataset1', 'dataset2', 'dataset3'];
        const options = datasets.map(ds => ({ key: ds, text: ds, value: ds }));

        return (
            <Form style={{margin: '20px'}} loading={this.props.isGrouping}>
                <Form.Select
                    label='Choose a dataset'
                    name='dataset'
                    options={options}
                    onChange={this.onDatasetSelect}
                />
                <Form.Button content='Group' onClick={this.onGroupClick}/>
            </Form>
        )
    }
};

DatasetSelectAndGroup.propTypes = {
    isGrouping: PropTypes.bool.isRequired,
    onGroupClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isGrouping: state.dataset.isGrouping
});

const mapDispatchToProps = (dispatch) => ({
    onGroupClick(dataset) {
        dispatch(requestLoadAndGroupDataset(dataset));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DatasetSelectAndGroup);