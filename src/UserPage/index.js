import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react'

function UserPage(props) {
  // const src = '/images/wireframe/white-image.png';
  console.log("this is props in user page >>>", props);

    return( 
        <Card color='red' key={props.userInfo.id}>
          <Card.Content>
            <h3>Your Profile Info:</h3>
            <h4>{props.userInfo.username}</h4>
            <Card.Description>{props.userInfo.bio}</Card.Description>
            <Button>Update Bio</Button>
          </Card.Content>
        </Card>
    )

}
export default UserPage

