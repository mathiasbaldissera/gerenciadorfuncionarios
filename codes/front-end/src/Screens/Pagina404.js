import React from 'react'

export function Pagina404(props) {
	return (
		<div className='d-flex justify-content-center align-items-center flex-column'>
			<h1>Erro 404</h1>
			<p>
				A pagina
				<code className="bg-dark p-1 rounded mx-2  border border-secondary">{window.location.pathname}</code>
				 não existe
			</p>
		</div>
	)
}
