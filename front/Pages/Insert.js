import React, { useState, Component } from "react";
import { Container, Content, Header, Field,Left, Body, Right, Title, Form, Item, Input, Label, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class MyClass extends Component {

    constructor(props){
      super(props);
      this.state = {
        textInput : [],
        inputData : []
      }
    }
  
    //function to add TextInput dynamically
    addTextInput = (index) => {
      let textInput = this.state.textInput;
      textInput.push(<TextInput style={styles.textInput}
        onChangeText={(text) => this.addValues(text, index)} />);
      this.setState({ textInput });
    }
  
    //function to remove TextInput dynamically
    removeTextInput = () => {
      let textInput = this.state.textInput;
      let inputData = this.state.inputData;
      textInput.pop();
      inputData.pop();
      this.setState({ textInput,inputData });
    }
  
    //function to add text from TextInputs into single array
    addValues = (text, index) => {
      let dataArray = this.state.inputData;
      let checkBool = false;
      if (dataArray.length !== 0){
        dataArray.forEach(element => {
          if (element.index === index ){
            element.text = text;
            checkBool = true;
          }
        });
      }
      if (checkBool){
      this.setState({
        inputData: dataArray
      });
    }
    else {
      dataArray.push({'text':text,'index':index});
      this.setState({
        inputData: dataArray
      });
    }
    }
  
    //function to console the output
    getValues = () => {
      console.log('Data',this.state.inputData);
    }
  
  
    /*render(){
      return(
        
      )
    }*/
  }

function InsertRecipe(props) {
  
  const [isError, setIsError] = useState(false);
  const [recipe_name, setRecipe_name] = useState("");
  const [recipe_description, setRecipe_description] = useState("");
  const [duration, setDuration] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [kcal, setKcal] = useState("");
  const [user_id, setUser_id] = useState("");
  
  const post = () => {
    var recipe = {
      recipe_name: recipe_name.text,
      recipe_description: recipe_description.text,
      duration: duration.text,
      picture: picture.text,
      category: category.text,
      kcal: kcal.text,
      user_id: parseInt(user_id.text)
    }
    
    axios.post("http://192.168.1.68:8000/api/insertRecipe", recipe)
    //axios.post("http://192.168.1.119:8000/api/insertUser", user)
    .then(result => {  
      console.log(result.data);
      if (result.data==true) {
        Actions.signin();
      } else {
        console.log(result.data);
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
          <Title>Create Recipe</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Input placeholder="Name" onChangeText={(text) => setRecipe_name({text})} />
          </Item>
          <Item floatingLabel>
            <Input placeholder="Description" onChangeText={(text) => setRecipe_description({text})} />
          </Item>
          <Item floatingLabel>
            <Input placeholder="Duration" onChangeText={(text) => setDuration({text})} />
          </Item>
          <Item floatingLabel>
            <Input placeholder="Picture" onChangeText={(text) => setPicture({text})} />
          </Item>
          <Item floatingLabel>
            <Input placeholder="Category" onChangeText={(text) => setCategory({text})} />
          </Item>
          <Item floatingLabel>
            <Input placeholder="Kcal" onChangeText={(text) => setKcal({text})} />
          </Item>
          <Item floatingLabel>
          <Button title='Add' onPress={() => MyClass.addTextInput(MyClass.state.textInput.length)} />
          </Item>
          <Item floatingLabel last>
            <Input placeholder="user_id" onChangeText={(text) => setUser_id({text})} />
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

export default InsertRecipe;