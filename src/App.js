import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './Components/Navbar';
import OperationsList from './Components/OperationsList';
import Form from './Components/Form';

function App() {

  const [operation, setOperation] = useState({
    concepto:'',
    monto:0,
    fecha:'',
    tipo:''
  })

  const [operations, setOperations] = useState([]);


  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() =>{
    const getOperations = () =>{
      fetch('http://localhost:9000/api')
      .then(res => res.json())
      .then(res => setOperations(res))
    }
    getOperations();
    setListUpdated(false);
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='App Gastos' />
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign:'center'}}>Operations List</h2>
            <OperationsList operation={operation} setOperation={setOperation} operations={operations} setListUpdated={setListUpdated}/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign:'center'}}>Operation Form</h2>
            <Form operation={operation} setOperation={setOperation}/>
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
