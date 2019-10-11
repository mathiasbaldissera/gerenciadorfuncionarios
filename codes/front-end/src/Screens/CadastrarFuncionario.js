import React, { useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Page } from '../components'
import { TiArrowBack } from 'react-icons/ti'
import  axios  from 'axios'
import { Modal } from '../components/Modal'
import _ from 'lodash'
import Form from 'react-bootstrap/Form'
import {
	FaArrowAltCircleRight,
	FaTimesCircle,
	FaRegTimesCircle,
	FaRegSave,
	FaArrowAltCircleLeft,
	FaSave,
} from 'react-icons/fa'
import { TextIconButton } from '../components/TextIconButton'
import { Redirect } from 'react-router-dom'

export const FormLine = (props) => {
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
const emailRegex = /[^@]+@[^@]+\.[a-zA-Z]{2,6}/
export function CadastrarFuncionario(props) {
	const [redirectTo, setRedirectTo] = useState()
	const [formValidated, setFormValidated] = useState(false)
	const [nomeFuncionario, setNomeFuncionario] = useState()
	const [sobrenomeFuncionario, setSobrenomeFuncionario] = useState()
	const [emailFuncionario, setEmailFuncionario] = useState()
	const [nisFuncionario, setNisFuncionario] = useState()
	const [showModal, setShowModal] = useState(false)
	function validateFieldsAndSubmit() {
		let hasError = false
		if (
			nomeFuncionario === '' ||
			nomeFuncionario == null ||
			nomeFuncionario.length < 2 ||
			nomeFuncionario.length > 30 ||
			sobrenomeFuncionario == '' ||
			sobrenomeFuncionario == null ||
			sobrenomeFuncionario.length < 2 ||
			sobrenomeFuncionario.length > 50 ||
			nisFuncionario === '' ||
			nisFuncionario == null ||
			nisFuncionario.length !== 11 ||
			!emailRegex.test(emailFuncionario)
		) {
			hasError = true
		}
		setFormValidated(true)
		if (hasError) {
			alert(
				'Algum campo obrigatório está em branco ou com dados invalidos'
			)
		} else {
			axios.post('http://localhost:8081/api/funcionarios', {
				nome: nomeFuncionario,
				sobrenome: sobrenomeFuncionario,
				email: emailFuncionario,
				nis: nisFuncionario,
			}).then((r)=> alert('success: '+r)).catch((e)=>alert('post error: '+e))
		}
	}
	// const history = useHistory()
	function renderRedirect() {
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}
	}

	return (
		<div>
			{renderRedirect()}
			<h3>Cadastro de Funcionários </h3>
			<Row>
				<Col md={12}>
					<TextIconButton
						variant='danger'
						onClick={() => {
							if (
								window.confirm(
									'Deseja realmente voltar? Todos os dados serão perdidos'
								)
							)
								setRedirectTo('/')
						}}
						icon={FaArrowAltCircleLeft}
						label='Voltar'
					/>
				</Col>
			</Row>
			<p
				className='text-danger mb-0 mt-4'
				style={{
					fontSize: 10,
				}}
			>
				Campos marcados com * são obrigatórios
			</p>
			<fieldset
				className='rounded p-3 pr-4 m-1'
				style={{ border: '1px solid #ddd' }}
			>
				<legend
					style={{
						marginLeft: 5,
						width: 'auto',
						fontSize: 18,
						color: 'var(--verde-unipampa)',
						fontWeight: 'bold',
					}}
				>
					Solicitar Aproveitamento de ACGs
				</legend>
				<Row>
					<Col md={8}>
						<Form
							className='ml-md-2'
							noValidate
							validated={formValidated}
						>
							<FormLine
								label='Nome*'
								invalidFeedbackMessage='O nome deve conter entre 2 e 30 caracteres'
							>
								<Form.Control
									required
									maxLength={30}
									minLength={2}
									value={nomeFuncionario}
									onChange={(e) =>
										setNomeFuncionario(e.target.value)
									}
								/>
							</FormLine>
							<FormLine
								label='Sobrenome*'
								invalidFeedbackMessage='O sobrenome deve conter entre 2 e 50
							caracteres'
							>
								<Form.Control
									required
									maxLength={50}
									minLength={2}
									value={sobrenomeFuncionario}
									onChange={(e) =>
										setSobrenomeFuncionario(e.target.value)
									}
								/>
							</FormLine>
							<FormLine
								label='E-mail*'
								invalidFeedbackMessage='O e-mail informado é invaldo'
							>
								<Form.Control
									required
									pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}'
									value={emailFuncionario}
									onChange={(e) =>
										setEmailFuncionario(e.target.value)
									}
								/>
							</FormLine>
							<FormLine label='NIS (PIS)*'>
								<Form.Control
									required
									maxLength={11}
									minLength={11}
									value={nisFuncionario}
									onChange={(e) =>
										setNisFuncionario(
											e.target.value.replace(/\D/g, '')
										)
									}
								/>
								<Form.Control.Feedback type='invalid'>
									O NIS(PIS) deve ter exatamente 11 numeros
								</Form.Control.Feedback>
							</FormLine>
						</Form>
					</Col>
				</Row>

				<div className='d-flex justify-content-end'>
					<TextIconButton
						variant='danger'
						icon={FaTimesCircle}
						label='Cancelar'
						onClick={() => {
							if (
								window.confirm(
									'Deseja realmente cancelar? Todos os dados serão perdidos'
								)
							)
								setRedirectTo('/')
						}}
					/>
					<TextIconButton
						variant='success'
						icon={FaSave}
						label='Salvar'
						className='ml-3'
						onClick={() => validateFieldsAndSubmit()}
					/>
				</div>
			</fieldset>

			<Modal
				show={showModal}
				onlyOneButton
				confirmText='Ta bom'
				title='Impossível completar a ação'
				handleClose={() => setShowModal(false)}
			>
				O back ainda não ta pronto, aguarde até ficar
			</Modal>
		</div>
	)
}
