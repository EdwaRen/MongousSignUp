import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recaptcha from 'react-recaptcha';
import MyHtml from './html.jsx';

class App extends Component {
  constructor(props) {
    super(props);



  }





  render() {



    return (
      <div className="App">
      <p>  Rendering app.js</p>
      <MyHtml/>
      </div>
    );
  }
}

export default App;
