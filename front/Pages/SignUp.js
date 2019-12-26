import React, { Component, TouchableOpacity } from 'react';
import { Container, Content, Header, Field,Left, Body, Right, Title, Form, Item, Input, Label, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

const SignIn: () => React$Node = () => { 
  
  const goToSignIn = () => {
    Actions.signin();
  }

  return (
    <Container >
      <Header>
        <Body>
          <Title>Sign Up</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Input placeholder="Name" />
          </Item>
          <Item floatingLabel>
            <Input placeholder="Email" />
          </Item>
          <Item floatingLabel last>
            <Input placeholder="Password" />
          </Item>
          <Button style= {{ margin: 10 }} block primary>
            <Text>Submit</Text>
          </Button>
        </Form>
        <Text>{'Already have an account? '}<Text style={{color:'#E65100'}} onPress={goToSignIn}>{'Sign In'}</Text></Text>
      </Content>
    </Container>
  );
}

export default SignIn;