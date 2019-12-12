import React, { Component } from 'react'
import App from '../App'
import UserList from '../UserList'
import CreateMessage from '../CreateMessageForm'
import MessageContainer from '../MessageContainer'
import UserPage from '../UserPage'
class UserContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			users: [],
			messages: [],
			editModalOpen: false,
			messageModalOpen: false,
			userToEdit:{
				bio: []
			},
			messageUser: null,
			isEmptyState: true,
			seeUserMessages: false
		}
	}

	
	componentDidMount(){
		console.log("componentDidMount in UserContainer");
		this.getUsers();
		// this.getMessages();
	}
	
	getUsers = async () => {
		try {
			const users = await fetch(process.env.REACT_APP_API + '/users/findAmigos', {
				credentials: 'include',
				method: 'GET'
			});
			const parsedUsers = await users.json();
			this.setState({
				users: parsedUsers
			})
			console.log(parsedUsers);
		} catch(err){
			console.log(err);



		}

	} 

	showMessages = (id) => {
		// put this id as message user in state
		// getMessages()

		// setState 

	}

	// this will work correctly once you have set userId of who you want to 
	// message in state
	getMessages = async () => {
		console.log("getMessages getting called");
		try {
			const url = process.env.REACT_APP_API + '/messages/' + this.state.messageUser._id
			console.log(url);
			const messages = await fetch(url, {
				method: 'GET',
				credentials:'include'
			});
			console.log("here is messages response from getMessages");
			const parsedMessages = await messages.json();
			console.log("here are the messages we got");
			console.log(parsedMessages);

			this.setState({
				messages: parsedMessages
			})
		}
		catch (err) {
			console.log(err)
		}
	

	}
	//need to change this to delete individual account
	deleteUser = async (id) => {
		const deleteUserAccountResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/', {
			method: 'DELETE',
			credentials: 'include'
		});
		const deleteUserAccountParsed = await deleteUserAccountResponse.json();
		console.log(deleteUserAccountParsed);
		this.setState({users: this.state.users.filter((user) => user._id !== id)})
	}
	editUser = (idOfUserToEdit) => {
		const userToEdit = this.state.users.find(user  => user.id === idOfUserToEdit)
		this.setState({
			editModalOpen: true,
			userToEdit: {
				...userToEdit
			}

		})
	}

	handleEditChange = (event) => {
		this.setState({
			userToEdit:{
				...this.state.userToEdit,
				[event.target.name]: event.target.value
			}
		})
	}
	updateUser = async (e) => {
		e.preventDefault()
		try{
			const url = process.env.REACT_APP_API + '/users/findAmigos' + this.state.userToEdit._id
			const updateResponse = await fetch(url, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.userToEdit),
				headers: {
					'Content-Type': 'application/json'
				}

			})
			const updateResponseParsed = await updateResponse.json()
			console.log('reponse from db after trying to do update');
			console.log(updateResponseParsed);


			const newUserArrayWIthUpdate = this.state.users.map((user) => {
				if(user.id === updateResponseParsed.data._id) {
					user = updateResponseParsed.data
				}
				return user
			})

			this.setState({
				users: newUserArrayWIthUpdate,
				
			})
			this.closeModal()

		} catch(err) {
			console.log(err);
		}
	}
	deleteUser = async (id) => {
        console.log(id);
        const deleteAmigoResponse = await fetch(process.env.REACT_APP_API + '/users/' + id, {
            method: 'DELETE',
            credentials: 'include'
        });
        const deleteAmigoParsed = await deleteAmigoResponse.json();
        console.log(deleteAmigoParsed);
        this.setState({users: this.state.users.filter((users) => users._id !== id)})
    }
	 openMessageModal = (userId) => {
        const messageUser = this.state.users.filter(user => user._id === userId)

        console.log('THIS IS openMessageModal:', messageUser);
        this.setState({
            messageModalOpen: true,
            messageUser: messageUser[0]
      
        })
    }
     openEditModal = (userId) => {
     	const userEdit = this.props.loggedInUser
     	console.log(userEdit);
        this.setState({
            editModalOpen: true

        })
    }
	closeEditModal = () =>  {
		this.setState({
			editModalOpen: false
		})
	}
	closeMessageModal = () =>  {
		this.setState({
			messageModalOpen: false,
			messageUser: null
		})
	}


	render() {
		console.log('these are your messages',this.state.messages);
		return(

			<div className="home">
				<div>
					<button type="submit" className="homebutton">Home</button><br></br>
					<button type="submit" className="findamigobutton">Find<br></br>Amigos</button><br></br>
					<button type="submit" className="messagesbutton">Learn</button><br></br>
					<button type="submit" className="logoutbutton">Logout</button><br></br>
				</div>
				{ this.state.messageUser === null ? null :
					<CreateMessage 
						receiver={this.state.messageUser} 
						messageModalOpen={this.state.messageModalOpen} 
						closeMessageModal={this.closeMessageModal}
					/> 
				}
				{ this.state.seeUserMessages 
				// 	?
				// 	// <SHOW NEW COMPONENT {this.state.seeUserMessages} {this.state.messages}>
				// 	:
				// 	null
				}
				{ this.state.messageUser !== null ? null :
				<UserList  users={this.state.users} openMessageModal={this.openMessageModal} deleteUser={this.deleteUser}/>}}
				<MessageContainer messages={this.state.messages} />
				<UserPage userInfo={this.props.loggedInUser} open={this.state.editModalOpen}/>
			</div>
				

		)
	}
}
export default UserContainer