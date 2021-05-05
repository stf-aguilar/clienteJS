import React from 'react';

const OperationsList = ({operation, setOperation, operations, setListUpdated}) => {
	
	const handleDelete = (id) => {
		const requestInit = {
			method: 'DELETE'
		}
		fetch('http://localhost:9000/api/'+ id, requestInit)
      	.then(res => res.text())
      	.then(res => console.log(res));

      	setListUpdated(true);
	}

	let{concepto, monto,fecha,tipo} = operation;

	const handleUpdate = (id) => {
		monto = parseInt(monto);
		//validación de los datos
		if(concepto === '' || monto <= 0 || tipo === false){
			alert('Todos los campos deben completarse')
			return
		}

		const requestInit = {
			method: 'PUT',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(operation)
		}
		fetch('http://localhost:9000/api/'+ id, requestInit)
      	.then(res => res.text())
      	.then(res => console.log(res));

      	//reiniciando state de operation
      	setOperation({
      		concepto:'',
    		monto:0,
    		fecha:'',
    		tipo:null
      	})

      	setListUpdated(true);

	}
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Concepto</th>
					<th>Monto</th>
					<th>Fecha</th>
					<th>Tipo</th>
				</tr>
			</thead>

			<tbody>
				{operations.map(operation => (
					<tr key={operation.id}>
						<td>{operation.id}</td>
						<td>{operation.concepto}</td>
						<td>{operation.monto}</td>
						<td>{operation.fecha}</td>
						<td>{operation.tipo}</td>
						<td>
							<div className="mb-3">
								<button onClick={() => handleDelete(operation.id)} className="btn btn-danger">Delete</button>
							</div>
							<div className="mb-3">
								<button onClick={() => handleUpdate(operation.id)} className="btn btn-info">Update</button>
							</div>
						</td>
					</tr>

				))}
			</tbody>
		</table>
		);
}


export default OperationsList;