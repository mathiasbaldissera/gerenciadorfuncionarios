import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { generateModal } from '../components/Modal'

import { FaTimesCircle, FaArrowAltCircleLeft, FaSave } from 'react-icons/fa'
import { TextIconButton } from '../components/TextIconButton'
import { Redirect, useParams } from 'react-router-dom'
import { FormLine } from '../components/FormLine'

const emailRegex = /[^@]+@[^@]+\.[a-zA-Z]{2,6}/
export function EditarFuncionario(props) {
	const [redirectTo, setRedirectTo] = useState()
	const [formValidated, setFormValidated] = useState(false)
	const [nomeFuncionario, setNomeFuncionario] = useState()
	const [sobrenomeFuncionario, setSobrenomeFuncionario] = useState()
	const [emailFuncionario, setEmailFuncionario] = useState()
	const [nisFuncionario, setNisFuncionario] = useState()
	const [showModal, setShowModal] = useState(false)
	const [modalData, setModalData] = useState()
	const [fetchError, setFetchError] = useState()
	const { id } = useParams()
	useEffect(() => {
		axios
			.get('http://localhost:8080/api/funcionarios/' + id)
			.then((response) => {
				let funcionario = response.data
				setNomeFuncionario(funcionario.nome)
				setSobrenomeFuncionario(funcionario.sobrenome)
				setEmailFuncionario(funcionario.email)
				setNisFuncionario(funcionario.nis)
			})
			.catch((error) => {
				if (error.response) {
					setFetchError(error.response.data)
				} else {
					setFetchError(
						<p>
							Erro ao se comunicar com o servidor. Por favor,
							tente novamente mais tarde. Se o erro persistir,
							contate o suporte do sistema
						</p>
					)
				}
			})
	}, [])
	function validateFieldsAndSubmit() {
		let hasError = false
		if (
			nomeFuncionario === '' ||
			nomeFuncionario == null ||
			nomeFuncionario.length < 2 ||
			nomeFuncionario.length > 30 ||
			sobrenomeFuncionario === '' ||
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
			setModalData({
				title: 'Erro ao salvar',
				children:
					'Algum campo obrigatório está em branco ou com dados invalidos',
				confirmText: 'Ok',
				handleClose: () => setShowModal(false),
				onlyOneButton: true,
			})
			setShowModal(true)
		} else {
			axios
				.put('http://localhost:8080/api/funcionarios/'+id, {
					nome: nomeFuncionario,
					sobrenome: sobrenomeFuncionario,
					email: emailFuncionario,
					nis: nisFuncionario,
				})
				.then((r) => {
					setModalData({
						title: 'Sucesso',
						children: <p>Dados salvos com sucesso</p>,
						confirmText: 'Ok',
						handleClose: () => {
							setRedirectTo('/')
						},
						onlyOneButton: true,
					})
					setShowModal(true)
				})
				.catch((e) => {
					setModalData({
						title: 'Erro ao atualizar',
						children: e.response ? (
							<p>
								O servidor rejeitou e apontou um erro ao editar
								o funcionário: <code>{e.response.data}</code>
							</p>
						) : (
							<p>
								Erro ao se comunicar com o servidor. Por favor,
								tente novamente mais tarde. Se o erro persistir,
								contate o suporte do sistema
								<br />
								<code>Erro: {e.message}</code>
							</p>
						),
						confirmText: 'Ok',
						handleClose: () => setShowModal(false),
						onlyOneButton: true,
					})
					setShowModal(true)
				})
		}
	}

	function renderRedirect() {
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}
	}

	return (
		<div>
			{renderRedirect()}
			<h3>Edição de Funcionário </h3>
			<Row>
				<Col md={12}>
					<TextIconButton
						variant='danger'
						onClick={() => {
							if (fetchError) {
								setRedirectTo('/')
								return
							}
							setModalData({
								title: 'Cancelar',
								children: (
									<p>
										Deseja realmente cancelar? <br />Todas as alterações serão perdidas
									</p>
								),
								closeText: 'Não',
								confirmText: 'Sim',
								handleClose: () => setShowModal(false),
								handleConfirm: () => setRedirectTo('/'),
							})
							setShowModal(true)
						}}
						icon={FaArrowAltCircleLeft}
						label='Voltar'
					/>
				</Col>
			</Row>

			{!fetchError ? (
				<>
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
												setNomeFuncionario(
													e.target.value
												)
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
												setSobrenomeFuncionario(
													e.target.value
												)
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
												setEmailFuncionario(
													e.target.value
												)
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
													e.target.value.replace(
														/\D/g,
														''
													)
												)
											}
										/>
										<Form.Control.Feedback type='invalid'>
											O NIS(PIS) deve ter exatamente 11
											numeros
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
									setModalData({
										title: 'Cancelar',
										children: (
											<p>
												Deseja realmente cancelar? <br />Todas as alterações serão perdidas
											</p>
										),
										closeText: 'Não',
										confirmText: 'Sim',
										handleClose: () => setShowModal(false),
										handleConfirm: () => setRedirectTo('/'),
									})
									setShowModal(true)
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
				</>
			) : (
				<div className="d-flex align-items-center justify-content-center mt-2">
					<Alert variant="danger">
					{fetchError}
					</Alert>
				</div>
			)}

			{modalData
				? generateModal({ ...modalData, show: showModal })
				: null}
		</div>
	)
}
