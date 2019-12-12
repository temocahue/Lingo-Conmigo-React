import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react'

function UserPage(props) {
  console.log("this is props in user page >>>");
let userInfo = null
  if(props.userInfo){
    return( 
        <Card color='red' key={props.userInfo}>
          <Card.Content>
            <h3>Your Profile Info:</h3>
            <h4>{props.userInfo.username}</h4>
            <Card.Description>{props.userInfo.bio
            }</Card.Description>
             <Card.Description>{props.userInfo.nativeLaguage
            }</Card.Description>
            <Button onClick={() => props.openEditModal(userInfo)}>send</Button>
          </Card.Content>
        </Card>
    )
  }


}
export default UserPage

