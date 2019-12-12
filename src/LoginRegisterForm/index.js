import React from 'react'
import { Form, Button, TextArea, Label } from 'semantic-ui-react'


class LoginRegisterForm extends React.Component{
	constructor(){
		super();
		this.state = {
			username: '',
  			password: '',
  			bio: '',
  			nativeLanguage: '',
  			languageOfInterest: '',
  			// action: 'login'
		}
	}
	loginRegister = () => {
		if (this.state.action === 'login'){
			this.props.login({
				username: this.state.username,
				password: this.state.password,
				bio: this.state.bio
			})
		} else {
			this.setState({
				action: 'login'
			})
		}
	}
	switchForm = () => {
		if (this.state.action === 'login') {
			console.log('switching to register form')
			this.setState({
				action: 'register'
			})
		} else {
			console.log('switching to login form');
			this.setState({
				action: 'register'
			})
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault()

		const userLogin = {
			username: this.state.username,
			password: this.state.password,
			bio: this.state.bio
		}
		const registerInfo = {
			username: this.state.username,
			bio: this.state.bio,
			password: this.state.password,
			nativeLanguage: this.state.nativeLanguage,
			languageOfInterest: this.state.languageOfInterest
		}
		if (this.state.action === 'login'){
			try{
				console.log("trying to log in");
				const users = await fetch(process.env.REACT_APP_API + '/users/login', {
					method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(userLogin),
                    headers: {
                        'Content-Type': 'application/json'
                    }
				})
				const parseUser = await users.json();
                this.setState({
                	users: parseUser.data
                })
                this.loginRegister()
			} catch (err) {
				console.log('error:', err);
			}
		}else {
			try{
				const response = await fetch(process.env.REACT_APP_API + '/users/register', {
                    method: "POST",
                    credentials: 'include',
                    body: JSON.stringify(registerInfo),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })

                this.loginRegister()  
			} catch (err) {
				console.log('error', err)

			}
                
        }
			
	}
	render(){
		return(
			<div className='LoginRegisterForm'>
				<Form onSubmit={this.handleSubmit}>
				{
					this.state.action === 'register'
					?
					<React.Fragment>
					<h1>Create Account Here</h1>
						<Form.Field>
						<Label>nativeLanguage:</Label>
						<Form.Input
							type="text"
							name="nativeLanguage"
							value={this.state.nativeLanguage}
							onChange={this.handleChange}
						/>
						</Form.Field>
						<Form.Field>
						<Label>Bio:</Label>
				<Form.Input
					type="text"
					name="bio"
					value={this.state.bio}
					onChange={this.handleChange}
				/>
				</Form.Field>
				<Form.Field>
				<Label>languageOfInterest:</Label>
				<Form.Input
					type="text"
					name="languageOfInterest"
					value={this.state.languageOfInterest}
					onChange={this.handleChange}
				/>
				</Form.Field>
					</React.Fragment>
					:
					null
				}
				<Form.Field>
					<Label>username:</Label>
					<Form.Input
						type="username"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					</Form.Field>
				<Form.Field>
					<Label>Password:</Label>
					<Form.Input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</Form.Field>
				<Button type="submit">{this.state.action === "register" ? "Register" : 'Login in'}</Button>
				</Form>
				{
					this.state.action === "register"
					?
					<small>Already have an account ? Log in <span onClick={this.switchForm}>here</span>
					</small>
					:
					<small> Need an account? Sign up <span onClick={this.switchForm}>here</span>!
					</small>

				}
			</div>
			


		)
	}		
}		
	
export default LoginRegisterForm
