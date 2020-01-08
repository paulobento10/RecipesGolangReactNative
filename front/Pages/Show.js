import React, { Component } from 'react';
import { Container, Body, Right, Icon, Button, Title, Text } from 'native-base';
import Search from '../Components/Show/ShowSearch';
import Header from '../Components/Show/ShowHeader';

function Show(props) {
    return (
      <Container>
            <Header user_id={props.user_id}/>
            <Search user_id={props.user_id}/>
      </Container>
    );
}

export default Show;