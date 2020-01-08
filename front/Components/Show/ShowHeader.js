import React from 'react';
import { Header, Body, Right, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

function ShowHeader(props) {
    const insertPress = () => {
        Actions.insert({user_id: props.user_id});
    }
    
    return (
            <Header>
                <Body>
                    <Title>Recipes</Title>
                </Body>
                <Right>
                    <Icon name="ios-add" style={{fontSize: 40, color: 'white'}} onPress={insertPress} />
                </Right>
            </Header>
    );
}

export default ShowHeader;