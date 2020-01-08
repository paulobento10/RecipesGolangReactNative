import React, { Component } from 'react';
import { Container, Header, Body, Right, Icon, Button, Title, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

function InsertHeader(props) {
    const userCreationsPress = () => {
        Actions.usercreations({user_id: props.user_id});
    }
    return (
            <Header>
                <Body>
                    <Title>Recipes</Title>
                </Body>
                <Right>
                    <Icon name="ios-add" style={{fontSize: 40, color: 'white'}} onPress={userCreationsPress}/*redirecionar para UsersCreations*//>
                </Right>
            </Header>
    );
}

export default InsertHeader;