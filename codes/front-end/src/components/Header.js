import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaUserPlus, FaUsers, FaBars } from 'react-icons/fa'
export const Header = () => {
	return (
		<Navbar expand='lg' className='flex-column align-items-start px-0'>
			<div
				className=' px-2 d-flex justify-content-between align-items-center'
				style={{
					width: '100%',
					borderBottom: '1px solid #0002',
				}}
			>
				<Navbar.Brand href='#'>
					<h2>SGF</h2>
				</Navbar.Brand>
				<Navbar.Toggle className="border-light text-light" aria-controls='navbar' >
				<FaBars/></Navbar.Toggle>
			</div>
			<Navbar.Collapse
				className='pg-2'
				style={{
					width: '100%',
					marginTop: -1,
				}}
				id='navbar'
			>
				<Nav className='mr-auto p-1'>
					<Nav.Link
						className='text-light hvr-underline-reveal'
						href='/'
					>
						Lista de Funcionarios <FaUsers />
					</Nav.Link>
					<Nav.Link
						className='text-light hvr-underline-reveal'
						href='/'
					>
						Cadastrar Funcionarios <FaUserPlus />
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
