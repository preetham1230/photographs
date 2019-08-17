import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
//import Images from './Images.js';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Route path="/users" component={Home} />
      
      </div>
      </Router>
      
    );
  }
}


export default App;