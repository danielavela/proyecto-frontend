import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    
    return <Navbar className="naranja" dark expand="md">
        
      <NavbarBrand tag={Link} to="/">Inicio</NavbarBrand>
      {/* <NavbarBrand tag={Link} to="/children">Gestión de datos personales de niños o adolescentes</NavbarBrand> */}
          
      
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
         
        </Nav>
      </Collapse>
    </Navbar>;
  }
}