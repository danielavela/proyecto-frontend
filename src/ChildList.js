import React, { Component , useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ChildList extends Component {

  constructor(props) {
    super(props);
    this.state = {children: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }
  
  /* const [nameSearch, setNameSearch] = useState("");
  const [children, setChildren] = useState([]);
  
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      
      const response = await fetch(`http://localhost:4000/api/children/search/?nameSearch=${nameSearch}`);
  
      const parseResponse = await response.json();
  
      setChildren(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  }; */

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/children')
      .then(response => response.json())
      .then(data => this.setState({children: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/child/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedChildren = [...this.state.children].filter(i => i.id !== id);
      this.setState({children: updatedChildren});
    });
  }

  render() {
    const {children, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const childList = children.map(child => {
      return <tr key={child.id}>
        <td style={{whiteSpace: 'nowrap'}}>{child.name}</td>
        <td>{child.legalSituation}</td>
        <td>{child.education}</td>
        <td>{child.typeIncome}</td>
        
        <td>
          <ButtonGroup>
            
            <Button size="sm" color="primary" tag={Link} to={"/children/" + child.id}>Ver y editar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(child.id)}>Eliminar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <br/>
        
        <Container fluid>
          <div className="naranjaLetra">
            <h4>Gestión de datos personales de niños o adolescentes</h4>
          </div>
          
          <div className="float-right">
            <Button color="dark" tag={Link} to="/children/new">Registrar nuevo niño o adolescente</Button>
          </div>
   
          <br/>
          <br/>
          <div className="container text-center">
            <h4>Lista de niños o adolescentes</h4>
          </div>

          <form className="d-flex">
            <input type="text" name="name" placeholder="Buscar niño o adolescente" className="form-control"
               //value={nameSearch}
              // onChange={e => setNameSearch(e.target.value)}  onSubmit={onSubmitForm}
            />
            <button className="btn btn-success">Buscar</button>
          </form> 
         {/*   <div className="d-flex">
            <input type="text" name="name" placeholder="Buscar niño o adolescente" className="form-control"/>
            <button className="btn btn-success">Buscar</button>
          </div>  */}


          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Nombre</th>
                <th width="20%">Situación legal</th>
                <th width="20%">Nivel de educación</th>
                <th width="20%">Tipo de ingreso</th>
                <th width="10%">Opciones</th>
              </tr>
            </thead>
            <tbody>
            {childList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ChildList;