import React from 'react'
import { Form, Select } from 'semantic-ui-react'

export default class DatasetSelectAndGroup extends React.Component {

    onDatasetSelect = (e, {name, value}) => { this.setState({ [name]: value }); }
    
    render() {
        const datasets = ['dataset1', 'dataset2', 'dataset3'];
        const options = datasets.map(ds => ({ key: ds, text: ds, value: ds }));
        return (
            <Form style={{margin: '20px'}}>
                <Form.Select
                    label='Choose a dataset'
                    name='dataset'
                    options={options}
                    onChange={this.onDatasetSelect}
                />
                <Form.Button content='Group' />
            </Form>
        )
    }
};  