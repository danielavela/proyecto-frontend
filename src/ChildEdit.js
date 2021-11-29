import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ChildEdit extends Component {

  emptyChild = {
    name: '',
    legalSituation: '',
    education: '',
    typeIncome: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyChild
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const child = await (await fetch(`/api/child/${this.props.match.params.id}`)).json();
      this.setState({item: child});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/child', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/children');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Editar registro de niño o adolescente' : 'Registrar nuevo niño o adolescente'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="legalSituation">Situación legal</Label>
            <Input type="text" name="legalSituation" id="legalSituation" value={item.legalSituation || ''}
                   onChange={this.handleChange} autoComplete="legalSituation"/>
          </FormGroup>          
          <FormGroup>
            <Label for="education">Nivel de educación</Label>
            <Input type="text" name="education" id="education" value={item.education || ''}
                   onChange={this.handleChange} autoComplete="education"/>
          </FormGroup>
          <FormGroup>
            <Label for="typeIncome">Tipo de ingreso</Label>
            <Input type="text" name="typeIncome" id="typeIncome" value={item.typeIncome || ''}
                   onChange={this.handleChange} autoComplete="typeIncome"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Aceptar</Button>{' '}
            <Button color="secondary" tag={Link} to="/children">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ChildEdit);