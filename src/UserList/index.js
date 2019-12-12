import React from 'react'

import { Card, Button, Image } from 'semantic-ui-react'

function UserList(props) {
	let users = null
	if(props.users) {
		users = props.users.map((user) => {
			return(
					<Card color='red' key={user._id}>
						<Card.Content>
							<h3>Amigos:</h3>
							<Card.Header>{user.username}</Card.Header>
							<Card.Description>{user.nativeLanguage}</Card.Description>
							<Card.Description>{user.languageOfInterest}</Card.Description>
							<Card.Description>{user.bio}</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button onClick={() => props.openMessageModal(user._id)}>Message User</Button>
							<Button onClick={() => props.deleteUser(user._id)}>Delete</Button>
						</Card.Content>
					</Card>
			)
		}) 
	}
	return (
		<Card.Group>
			{ users }
		</Card.Group>
	)
}


export default UserList

