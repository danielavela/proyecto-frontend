import React, { Component } from 'react';
import './App.css';
import cetwa from './assets/img/cetwa.jpg';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <br/>
          <div className="bienvenida">
            <h3>BIENVENIDO</h3>
          </div>
          
          <br/>
          <img  className = "imagen" src={cetwa} alt="Logo de la comunidad educativa"  />
          <br/>
          
          <Button color="dark" tag={Link} to="/children">Gestión de datos personales de niños o adolescentes</Button>
        </Container>
      </div>
    );
  }
}

export default Home;