import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import {Page} from './components'
import { ListaFuncionarios } from './Screens/ListaFuncionarios';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	return (
		<Router history={browserHistory}>
			<Route path='/' component={Page}>
				<IndexRoute component={ListaFuncionarios} />
				{/*<Route path="/cadastrar" component={}/>*/}
				{/*<Route path="/editar/:id" component={}/>*/}
			</Route>
		</Router>
	)
}

export default App;
