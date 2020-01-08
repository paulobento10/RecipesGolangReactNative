import React, { useState } from "react";
import { Container, Content, Header, Field,Left, Body, Right, Title, Form, Item, Input, Label, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

function SignUp(props) {
  
  const [isError, setIsError] = useState(false);
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const post = () => {
    var user = {
      User_name: user_name.text,
      email: email.text,
      password: password.text,
    }
    
    //axios.post("http://192.168.1.68:8000/api/insertUser", user)
    axios.post("http://192.168.1.119:8000/api/insertUser", user)
    .then(result => {  
      if (result.data==true) {
        Actions.signin();
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

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
            <Input placeholder="Name" onChangeText={(text) => setUser_name({text})} />
          </Item>
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
        <Text>{'Already have an account? '}<Text style={{color:'#E65100'}} onPress={goToSignIn}>{'Sign In'}</Text></Text>
        { isError &&<Text>Something went wrong, please try again.</Text> }
      </Content>
    </Container>
  );
}

export default SignUp;