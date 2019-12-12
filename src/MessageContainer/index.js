import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react'

function MessageContainer(props) {
    // const src = '/images/wireframe/white-image.png';
    console.log("this is props in user list >>>", props);
	    const messages = props.messages.map((message) => {
	        return(
	                <Card color='red' key={message._id}>
	                    <Card.Content>
	                         <Card.Header> New Message</Card.Header>
	                        <strong>{message.sender_user.username}:</strong>
	                        <Card.Description>{message.message_text}</Card.Description>
	                        <Button onClick={() => props.deleteMessage(message._id)}>Delete Message</Button>
	                    </Card.Content>
	                    <Card.Content extra>
	                    </Card.Content>
	                </Card>
	    	)


	    })
    return (
        <Card.Group>
            { messages }
        </Card.Group>
    )
}

export default MessageContainer



