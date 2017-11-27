import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import Grid from './grid';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loggedIn: true,
      count: 0
    }
  }
  
  componentDidMount() {
    window.onresize = this.resize;
  }
  
  resize = () => {
    var newHeight = window.innerHeight - 80;
    newHeight = newHeight * 0.7;
    this.setState({height: newHeight})
  }

  login = (username) => {
    this.setState({loggedIn: true, user: username})
  }
  
  logout = () => {
    this.setState({loggedIn: false, user: ''});
  }

  render() {  
    if(this.state.loggedIn) {
      return (
        <div className="App">
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                Basket Pricer
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <NavItem eventKey={1} href="/">Logout</NavItem>
              <Navbar.Text> Signed in as: {this.state.user} </Navbar.Text>
            </Nav>              
          </Navbar>
          <Grid height={this.state.height}/>
        </div>
      );
    } else {
      return (
        <Login login={this.login}/>
      );
    }
  }
}

export default App;