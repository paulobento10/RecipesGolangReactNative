import React, { Component } from 'react';
import { Container, Header, Body, Right, Icon, Button, Title, Text } from 'native-base';

const InsertHeader: (props) => React$Node = () => { 
    return (
            <Header>
                <Body>
                    <Title>Recipes</Title>
                </Body>
                <Right>
                    <Icon name="ios-add" style={{fontSize: 40, color: 'white'}} /*redirecionar para UsersCreations*//>
                </Right>
            </Header>
    );
}

export default InsertHeader;