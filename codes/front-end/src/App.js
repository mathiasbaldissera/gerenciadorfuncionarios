import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Page } from './components'
import { ListaFuncionarios } from './Screens/ListaFuncionarios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CadastrarFuncionario } from './Screens/CadastrarFuncionario'
import { Pagina404 } from './Screens/Pagina404'
import { EditarFuncionario } from './Screens/EditarFuncionario';

function App() {
	return (
		<BrowserRouter>
			<Page>
				<Switch>
					<Route exact path='/' component={ListaFuncionarios} />
					<Route
						exact
						path='/cadastrar'
						component={CadastrarFuncionario}
					/>
					<Route path="/editar/:id" component={EditarFuncionario}/>
					<Route component={Pagina404} />
				</Switch>
			</Page>
		</BrowserRouter>
	)
}

export default App
