import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

export default function QueryUploader(props) {
  const fileInputStyle = {
    width: '300px'
  }
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group inline widths='equal'>
        <Form.Input
          name='queryFile'
          type='file'
          style={fileInputStyle} />
        <Form.Button type='submit' fluid>Upload</Form.Button>
      </Form.Group>
    </Form>
  );
}

QueryUploader.propTypes = {
  onSubmit: PropTypes.func
}