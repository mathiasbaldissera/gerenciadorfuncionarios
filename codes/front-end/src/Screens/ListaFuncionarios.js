import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
	OverlayTrigger,
	Tooltip,
	Table,
	Col,
	Row,
	Nav,
	Button,
	Alert,
} from 'react-bootstrap'
import { TooltipContainer } from '../components'
import {
	FaUserEdit,
	FaUserTimes,
	FaSortDown,
	FaSortUp,
	FaSort,
	FaUserPlus,
	FaEye,
} from 'react-icons/fa'
import axios from 'axios'
import _ from 'lodash'
import { TextIconButton } from '../components/TextIconButton'
import { Redirect } from 'react-router-dom'
import { generateModal } from '../components/Modal'

export function SortIndicator(props) {
	return props.actualSortKey === props.sortKey ? (
		props.isSortAsc ? (
			<FaSortUp onClick={() => props.changeSort(props.sortKey)} />
		) : (
			<FaSortDown onClick={() => props.changeSort(props.sortKey)} />
		)
	) : (
		<FaSort onClick={() => props.changeSort(props.sortKey)} />
	)
}
export function ListaFuncionarios(props) {
	const [redirectTo, setRedirectTo] = useState()
	const [showModal, setShowModal] = useState(false)
	const [modalData, setModalData] = useState()

	const [funcionarios, setFuncionarios] = useState()
	const [actualSortByKey, setActualSortByKey] = useState()
	const [isSortAsc, setIsSortAsc] = useState(true)
	const [fetchError, setFetchError] = useState(false)

	function renderRedirect() {
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}
	}

	function changeSort(sortKey) {
		if (sortKey === actualSortByKey) {
			setIsSortAsc(!isSortAsc)
		} else {
			setActualSortByKey(sortKey)
			setIsSortAsc(true)
		}
	}

	function SortIndicator(props) {
		return actualSortByKey === props.sortKey ? (
			isSortAsc ? (
				<FaSortUp onClick={() => changeSort(props.sortKey)} />
			) : (
				<FaSortDown onClick={() => changeSort(props.sortKey)} />
			)
		) : (
			<FaSort onClick={() => changeSort(props.sortKey)} />
		)
	}
	function fetchFuncionarios() {
		axios
			.get('http://localhost:8080/api/funcionarios')
			.then((response) => {
				setFuncionarios(response.data)
			})
			.catch((error) => {
				setFetchError(true)
			})
	}
	function verDadosFuncionario(id) {
		axios
			.get('http://localhost:8080/api/funcionarios/' + id)
			.then((r) => {
				setModalData({
					title: 'Dados do funcionário',
					children: (
						<div>
							<div></div>
							<b>Nome completo: </b>
							{r.data.nome} {r.data.sobrenome}
							<br />
							<b>Email: </b>
							{r.data.email}
							<br />
							<b>NIS: </b>
							{r.data.nis}
							<br />
						</div>
					),
					confirmText: 'Fechar',
					handleClose: () => {
						setShowModal(false)
					},
					onlyOneButton: true,
				})
				setShowModal(true)
			})
			.catch((e) => {
				setModalData({
					title: 'Erro ao atualizar',
					children: (
						<p>
							Erro ao se comunicar com o servidor. Por favor,
							tente novamente mais tarde. Se o erro persistir,
							contate o suporte do sistema
							<br />
							<code>Erro: {e.message}</code>
						</p>
					),
					confirmText: 'fechar',
					handleClose: () => {
						fetchFuncionarios()
						setShowModal(false)
					},
					onlyOneButton: true,
				})
				setShowModal(true)
			})
	}
	function deletarFuncionario(id) {
		axios
			.delete('http://localhost:8080/api/funcionarios/' + id)
			.then((r) => {
				setModalData({
					title: 'Sucesso',
					children: (
						<p>
							Funcionario {r.data.nome} {r.data.sobrenome}{' '}
							deletado com sucesso
						</p>
					),
					confirmText: 'Ok',
					handleClose: () => {
						fetchFuncionarios()
						setShowModal(false)
					},
					onlyOneButton: true,
				})
				setShowModal(true)
			})
			.catch((e) => {
				setModalData({
					title: 'Erro ao deletar',
					children: e.response ? (
						<p>
							O servidor rejeitou e apontou um erro ao deletar o
							funcionário: <code>{e.response.data}</code>
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
					handleClose: () => {
						fetchFuncionarios()
						setShowModal(false)
					},
					onlyOneButton: true,
				})
				setShowModal(true)
			})
	}
	useEffect(() => {
		fetchFuncionarios()
	}, [])
	useEffect(() => {
		console.log(funcionarios)
	}, [funcionarios])
	useEffect(() => {
		if (actualSortByKey != null)
			setFuncionarios((f) =>
				_.orderBy(
					f,
					[
						(funcionario) =>
							funcionario[actualSortByKey].toLowerCase(),
					],
					[isSortAsc ? 'asc' : 'desc']
				)
			)
	}, [actualSortByKey, isSortAsc])
	return (
		<>
			{renderRedirect()}

			<Row>
				<Col md={8}>
					<h3 className=''>Lista de Funcionários</h3>
				</Col>
				<Col md={4} className='d-flex justify-content-md-end'>
					<TextIconButton
						icon={FaUserPlus}
						label='Cadastrar Funcionário'
						variant='success'
						onClick={() => setRedirectTo('/cadastrar')}
					/>
				</Col>
			</Row>
			<Row>
				{funcionarios != null && !_.isEmpty(funcionarios) ? (
					<Table
						striped
						hover
						className='mt-3 lista-funcionarios'
						responsive
					>
						<thead>
							<tr>
								<th>
									Nome
									<SortIndicator sortKey='nome' />
								</th>
								<th>
									Sobrenome
									<SortIndicator sortKey='sobrenome' />
								</th>
								<th>
									E-mail
									<SortIndicator sortKey='email' />
								</th>
								<th>
									NIS
									<SortIndicator sortKey='nis' />
								</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{_.map(funcionarios, (value, index) => {
								return (
									<tr>
										<td>{value.nome}</td>
										<td>{value.sobrenome}</td>
										<td className='lista-email'>
											{value.email}
										</td>
										<td className='lista-nis'>
											{value.nis}
										</td>
										<td className='d-flex flex-row'>
											<TooltipContainer
												id={`id_info${index}`}
												tooltipText='Info'
											>
												<TextIconButton
													icon={FaEye}
													variant='info'
													className='mr-2'
													onClick={() =>
														verDadosFuncionario(
															value.id
														)
													}
												/>
											</TooltipContainer>
											<TooltipContainer
												id={`id_edit${index}`}
												tooltipText='Editar'
											>
												<TextIconButton
													icon={FaUserEdit}
													variant='primary'
													className='mr-2'
													onClick={() =>
														setRedirectTo(
															'/editar/' +
																value.id
														)
													}
												/>
											</TooltipContainer>
											<TooltipContainer
												id={`id_delete${index}`}
												tooltipText='Deletar'
											>
												<TextIconButton
													icon={FaUserTimes}
													variant='danger'
													onClick={() => {
														setModalData({
															title: 'Deletar',
															children: (
																<p>
																	Deseja
																	deletar o
																	funcionario{' '}
																	{value.nome}{' '}
																	{
																		value.sobrenome
																	}
																	? <br />
																	Esta ação
																	não pode ser
																	desfeita!
																</p>
															),
															closeText: 'Não',
															confirmText: 'Sim',
															handleClose: () =>
																setShowModal(
																	false
																),
															handleConfirm: () =>
																deletarFuncionario(
																	value.id
																),
														})
														setShowModal(true)
													}}
												/>
											</TooltipContainer>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				) : fetchError ? (
					<Alert
						variant='danger'
						className='mx-auto px-5 mt-3 text-center'
					>
						Erro ao buscar os funcionários. Por favor, atualize a
						pagina ou <a href='/'>clique aqui</a>.<br /> Caso o erro
						persistir, contate o técnico do sistema.
					</Alert>
				) : (
					<Alert variant='danger' className='mx-auto px-5 mt-3'>
						Não há funcionários cadastrados
					</Alert>
				)}
			</Row>
			{modalData
				? generateModal({ ...modalData, show: showModal })
				: null}
		</>
	)
}
