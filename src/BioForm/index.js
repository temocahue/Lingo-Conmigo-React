import React, { Component } from 'react';
import { Modal, Form, Header, Button, Label} from 'semantic-ui-react'
import UserPage from '../UserPage'

class BioForm extends Component{
	constructor(props) {
        super();
        this.state = {
            userId: ''
        }
    }
      componentDidMount(){
        this.getBio();
    }
    
    getBio = async () => {
        try {
            const bio = await fetch(process.env.REACT_APP_API + '/users/' + this.props.newInfo._id, {
                method: 'PUT',
                credentials: 'include'
            });
            const parsedBio = await bio.json();
            console.log('successfully fetched messages. This is the getMessages() in CreateMessageForm')
            console.log('parsedMessages', parsedBio);
            this.setState({
                userId: parsedBio.data,

            })
            console.log(this.state.bio);
        }
        catch (err) {
            console.log(err)
        }
    }
    handleChange = (e) => {

    	const newState = this.state
    	newState.bio = e.currentTarget.value
    	this.setState({
    		newState
    	})	
    }
	render(){
		return (
			<Modal openEditModal={this.props.openEditModal}closeIcon closeEditModal={this.props.closeEditModal} 
					>
				<Header>Edit</Header>
				<Form onSubmit={(e) => this.bio(e, this.state)}>


					<Label>Edit</Label>
					<Form.Input
						type='text'
						name="bio"
						value={this.state.bio} 
						onChange={this.handleChange} 
					/>
					<Button type="Submit">send</Button>
				</Form>
			</Modal>
		)
	}
}
export default BioForm
