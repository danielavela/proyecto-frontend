import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChildList from './ChildList';
import ChildEdit from './ChildEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/children' exact={true} component={ChildList}/>
          <Route path='/children/:id' component={ChildEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
