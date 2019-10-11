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
} from 'react-icons/fa'
import { axios } from 'axios'
import _ from 'lodash'
import { TextIconButton } from '../components/TextIconButton'
import {Redirect} from 'react-router-dom'
const mockUsers = [
	{
		nome: 'Matheus',
		sobrenome: 'Montanha Paulon',
		email: 'matheusmontanhakk@gmail.com',
		nis: '221.22221.21-1',
	},
	{
		nome: 'Mathias',
		sobrenome: 'Baldissera',
		email: 'mathiasbaldissera@gmail.com',
		nis: '222.22222.22-2',
	},
	{
		nome: 'Debora',
		sobrenome: 'dos Santos e Siqueira',
		email: 'deborasiqu@gmail.com',
		nis: '221.22221.21-1',
	},
]
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
	function renderRedirect() {
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}
	}
	
	const [funcionarios, setFuncionarios] = useState(mockUsers)

	const [actualSortByKey, setActualSortByKey] = useState()
	const [isSortAsc, setIsSortAsc] = useState(true)

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

	useEffect(() => {
		console.log('didmount')
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
						onClick={()=>setRedirectTo('/cadastrar')}
					/>
				</Col>
			</Row>
			<Row>
				{funcionarios != null ? (
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
												key={`edit${index}`}
												id={`id_edit${index}`}
												tooltipText='Editar'
											>
												<TextIconButton
													icon={FaUserTimes}
													variant='primary'
													className='mr-2'
												/>
											</TooltipContainer>
											<TooltipContainer
												key={`delete${index}`}
												id={`id_delete${index}`}
												tooltipText='Deletar'
											>
												<TextIconButton
													icon={FaUserTimes}
													variant='danger'
												/>
											</TooltipContainer>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				) : (
					<Alert variant='danger' className='mx-auto px-5'>
						Não há funcionários cadastrados
					</Alert>
				)}
			</Row>
		</>
	)
}
