import React from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'

class App extends React.Component {
  constructor(){
    super()
    this.state = {

      loggedIn: false,
      loggedInUser: null
    }
  }
  login = async (loginInfo) => {
    console.log('THIS IS THE APP.JS in the login')
    // console.log(process.env.REACT_APP_API_URL);
    const response = await fetch(process.env.REACT_APP_API + '/users/login', {
      method: "POST",
      credential: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status.code === 200){
      this.setState({
        loggedIn: true,
        loggedInUser: parsedLoginResponse.data
      })
    } else {
      console.log("Login Failed");
      console.log(parsedLoginResponse);
    }
  }
  register = async (registerInfo) => {
    console.log('this is the app.js in the register')
    const response = await fetch(process.env.REACT_APP_API + '/users/register', {
      method: "POST",
      credential: 'include',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status.code === 201){
      this.setState({
        loggedIn: true,
        loggedInUser: parsedLoginResponse.data
      })
    } else {
      console.log("Register Failed");
      console.log(parsedLoginResponse);
    }
  }
  render(){
    return(
      <div className="App">
      <h1>Lingo🗣Conmigo</h1>
  
      <LoginRegisterForm login={this.login} register={this.register}/>
      

      </div>
    );
  }
}

export default App;
