import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

export default function QueryUploader(props) {
  const fileInputStyle = {
    width: '300px'
  }

  const handleOnsubmit = (ev) => {
    const formData = new FormData(ev.target);
    props.onSubmit(formData);
  }

  return (
    <Form onSubmit={handleOnsubmit} size='tiny'>
      <Form.Input
        name='queryFile'
        label='Select a query file'
        type='file' />
      <Form.Group inline widths='equal'>
        <Form.Checkbox name='hasNameCol' label='Has name column' />
        <Form.Button floated='right' type='submit' >Upload</Form.Button>
      </Form.Group>
    </Form>
  );
}

QueryUploader.propTypes = {
  onSubmit: PropTypes.func
}