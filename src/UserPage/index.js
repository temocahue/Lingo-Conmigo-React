import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react'

function UserPage(props) {
  console.log("this is props in user page >>>");

    return( 
        <Card color='red' key={props.userInfo.id}>
          <Card.Content>
            <h3>Your Profile Info:</h3>
            <h4>{props.userInfo.username}</h4>
            <Card.Description>{props.userInfo.bio
            }</Card.Description>
            <Card.Description>{
            }</Card.Description>
            <Button onClick={() => props.openMessageModal()}>edit</Button>
          </Card.Content>
        </Card>
    )

}
export default UserPage

