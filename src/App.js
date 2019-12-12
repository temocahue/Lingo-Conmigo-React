import React from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import UserContainer from './UserContainer'

class App extends React.Component {
  constructor(){
    super()
    this.state = {

      loggedIn: false,
      loggedInUser: null
    }
  }
 register = async (registerInfo) => {
    const response = await fetch(process.env.REACT_APP_API + '/users/register', {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(registerInfo);
    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.success === true){
      this.setState({
        loggedIn: true,
        loggedInUser: registerInfo
      })
    } else {
      console.log("Login Failed");
      console.log(parsedLoginResponse);
    }
  }
 
  login = async (loginInfo) => {
    const response = await fetch(process.env.REACT_APP_API + '/users/login', {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(loginInfo);
    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.success === true){
      this.setState({
        loggedIn: true,
        loggedInUser: loginInfo
      })
    } else {
      console.log("Login Failed");
      console.log(parsedLoginResponse);
    }
  }
 
  render(){
    return(
      <div className="App">
      <h1>🇬🇧Lingo🗣Conmigo🇪🇸</h1>
      {
        this.state.loggedIn
        ?
        <UserContainer loggedInUser={this.state.loggedInUser}/>
        :
        <LoginRegisterForm login={this.login} register={this.register}/>
      }


      </div>
    );
  }
}

export default App;
