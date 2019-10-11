import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route,  } from 'react-router-dom'
import { Page } from './components'
import { ListaFuncionarios } from './Screens/ListaFuncionarios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CadastrarFuncionario } from './Screens/CadastrarFuncionario'

function App() {
	return (
		<BrowserRouter>
			<Page>
				<Route exact path='/' component={ListaFuncionarios} />
				<Route exact path='/cadastrar' component={CadastrarFuncionario} />
				{/*<Route path="/editar/:id" component={}/>*/}
			</Page>
		</BrowserRouter>
	)
}

export default App
