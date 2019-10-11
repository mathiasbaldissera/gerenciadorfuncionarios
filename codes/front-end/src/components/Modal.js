import React from 'react'
import BModal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
export const Modal = (props) => {
	return (
		<BModal centered show={props.show} onHide={props.handleClose}>
			<BModal.Header closeButton>
				<BModal.Title>{props.title}</BModal.Title>
			</BModal.Header>
			<BModal.Body>{props.children}</BModal.Body>
			{props.onlyOneButton ? (
				<BModal.Footer>
					<Button variant='primary' onClick={props.handleConfirm?props.handleConfirm:props.handleClose}>
						{props.confirmText ? props.confirmText : 'OK'}
					</Button>
				</BModal.Footer>
			) : (
				<BModal.Footer>
					<Button variant='secondary' onClick={props.handleClose}>
						{props.closeText ? props.closeText : 'Cancelar'}
					</Button>
					<Button variant='primary' onClick={props.handleConfirm?props.handleConfirm:props.handleClose}>
						{props.confirmText ? props.confirmText : 'OK'}
					</Button>
				</BModal.Footer>
			)}
		</BModal>
	)
}
