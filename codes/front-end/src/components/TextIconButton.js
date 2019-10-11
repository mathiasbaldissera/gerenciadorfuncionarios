import React from 'react'
import { Button } from 'react-bootstrap'
import { FaTimesCircle } from 'react-icons/fa'
export function TextIconButton(props) {
	let Icon = props.icon
	return (
		<Button
			{...props}
			className={
				'd-flex p-1 align-items-center font-weight-bold ' +
				props.className
			}
		>
			<Icon className='font-20' />
			{props.label ? <p className='mb-0 ml-2'>{props.label}</p> : null}
		</Button>
	)
}
