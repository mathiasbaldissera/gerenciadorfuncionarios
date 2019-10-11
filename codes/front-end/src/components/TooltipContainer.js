import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
export const TooltipContainer = (props) => {
	return (
		<OverlayTrigger
			{...props}
			key={props.key}
			placement={props.placement ? props.placement : 'top'}
			overlay={<Tooltip id={props.id}>{props.tooltipText}</Tooltip>}
		>
			{props.children}
		</OverlayTrigger>
	)
}
