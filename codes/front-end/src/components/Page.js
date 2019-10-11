import React from 'react'
import Container from 'react-bootstrap/Container'
import { Footer } from './Footer'
import { Header } from './Header'
export const Page = (props) => {
	return (
		<div>
			<Header />
			<Container
				className='bg-white shadow-sm mt-lg-2 p-4 mx-lg-4 rounded'
				fluid
                bsPrefix='lg'
                style={{...props.style}}
                {...props}
			>
				{props.children}
			</Container>
			<Footer />
		</div>
	)
}
