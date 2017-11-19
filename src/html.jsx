import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recaptcha from 'react-recaptcha';

class MyHtml extends Component {
  constructor(props) {
    super(props);



  }





  render() {



    return (
      <div className="App">
      <p>  HTML RENDERING</p>
      <form method="POST" action="/users/add">
        <label>First Name</label><br/>
        <input type ="text" name = "first_name"/><br/>
        <label>Last Name</label><br/>
        <input type ="text" name = "last_name"/><br/>
        <label>Email</label><br/>
        <input type ="text" name = "email"/><br /><br />
        <input type = "submit" value = "Submit"/>

      </form>
      </div>
    );
  }
}

export default MyHtml;
