 import React from 'react'
import {Form, Col, Row} from 'react-bootstrap'

export function FormLine  (props)  {
	return (
		<Form.Group as={Row} controlId={props.controlId} className='pb-3 '>
			<Form.Label column sm={props.labelsize ? props.labelsize : 4}>
				{props.label}
			</Form.Label>
			<Col sm={props.labelsize ? 12 - props.labelsize : 12 - 4}>
				{props.children}
				{props.invalidFeedbackMessage ? (
					<Form.Control.Feedback type='invalid'>
						{props.invalidFeedbackMessage}
					</Form.Control.Feedback>
				) : null}
			</Col>
		</Form.Group>
	)
}