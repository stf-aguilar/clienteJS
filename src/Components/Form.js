import React from 'react';

const Form = ({operation, setOperation}) => {
	const handleChange = e => {
		setOperation({
			...operation,
			[e.target.name]: e.target.value
		})
	}

	let{concepto, monto,fecha,tipo} = operation;

	const handleSubmit = () => {
		monto = parseInt(monto);
		//validación de los datos
		if(concepto === '' || monto <= 0 || tipo === false){
			alert('Todos los campos deben completarse')
			return
		}

		//consulta
		const requestInit = {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify(operation)
		}
		fetch('http://localhost:9000/api', requestInit)
      	.then(res => res.text())
      	.then(res => console.log(res));

      	//reiniciando state de operation
      	setOperation({
      		concepto:'',
    		monto:0,
    		fecha:'',
    		tipo:null
      	})
	}

	return(
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label htmlFor="concepto" className="form-label">Concepto</label>
				<input value={concepto} onChange={handleChange} type="text" id="concepto" name="concepto" className="form-control"/>
			</div>
			<div className="mb-3">
				<label htmlFor="monto" className="form-label">Monto</label>
				<input value={monto} onChange={handleChange} type="number" id="monto" name="monto" className="form-control"/>
			</div>
			<div className="mb-3">
				<label htmlFor="fecha" className="form-label">Fecha</label>
				<input value={fecha} onChange={handleChange} type="date" id="fecha" name="fecha" className="form-control"/>
			</div>
			<div className="mb-3">
				<label htmlFor="tipo" className="form-label">Tipo</label>

				<input onChange={handleChange} className="form-check-input" type="radio" name="tipo" id="ingreso" value="ingreso"/>
				<label className="form-check-label" for="ingreso">Ingreso</label>
				
				<input onChange={handleChange} className="form-check-input" type="radio" name="tipo" id="egreso" value="egreso"/>
				<label className="form-check-label" for="egreso">Egreso</label>
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	);

}


export default Form;