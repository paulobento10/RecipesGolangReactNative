import React, { useState } from "react";
import { Container, Content, Header, Field,Left, Body, Right, Title, Form, Item, Input, Label, Button, Text, TextInput } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

function SignIn(props) {

  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const post = () => {
    var user = {
      email: email.text,
      password: password.text,
    }
    
    //axios.post("http://192.168.1.68:8000/api/login", user)
    axios.post("http://192.168.1.119:8000/api/login", user)
    .then(result => {
      if (result.data>=true) {
        Actions.show({user_id: result.data});
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  const goToRegister = () => {
    Actions.signup();
  }

  return (
    <Container >
      <Header>
        <Body>
          <Title>Sign In</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Input placeholder="Email" onChangeText={(text) => setEmail({text})} />
          </Item>
          <Item floatingLabel last>
            <Input secureTextEntry={true} placeholder="Password" onChangeText={(text) => setPassword({text})} />
          </Item>
          <Button style= {{ margin: 10 }} block primary onPress={post}>
            <Text>Submit</Text>
          </Button>
        </Form>
        { isError &&<Text style={{color: '#ff0000'}}>Something went wrong, please try again.</Text> }
        <Text>{'Doesn\'t have an account? '}<Text style={{color:'#E65100'}} onPress={goToRegister}>{'Register'}</Text></Text>
      </Content>
    </Container>
  );
}

export default SignIn;