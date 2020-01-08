import React, { Component } from 'react';
import { Container, Body, Right, Icon, Button, Title, Text } from 'native-base';
import Search from '../Components/Show/ShowSearch';
import Header from '../Components/Show/ShowHeader';

function UserCreations(props) {
    return (
      <Container>
            <Text>User Nrº {props.user_id} Creations (Undone)</Text>
      </Container>
    );
}

export default UserCreations;