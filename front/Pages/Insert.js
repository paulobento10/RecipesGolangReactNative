import React, { useState, Component } from "react";
import { Container, Content, Header, Field,Left, Body, Right, Title, Form, Item, Input, Label, Button, Text, AppRegistry, TouchableOpacity, Image, Animated, ScrollView, StyleSheet, View} from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';

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

  const getIngredients = () =>{
    var ingredients = {
      /*Ingredient_id:,
      Ingredient_name:,
      Kcal:,*/
    }
    
    var checkBoxComponentList = [];
    var ingredients_aux;

    axios.get("http://192.168.1.68:8000/api/searchIngredientAll", ingredients)
    //axios.post("http://192.168.1.119:8000/api/insertUser", user)
    .then(result => {  
      console.log(result.data);
      if (result.data==true) {
        //Actions.signin();
        ingredients_aux = result.data;
        for(let i=0; i<result.data.length; i++){
            checkBoxComponentList.push(<CheckBoxComponent 
                title={sellablePartsCategory[i]}
                checked= {true} />);
        }
        return checkBoxComponentList;

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
          <Item floatingLabel last>
            <Input placeholder="user_id" onChangeText={(text) => setUser_id({text})} />
          </Item>
          <Button style= {{ margin: 10 }} block primary onPress={getIngredients}>
            <Text>ingredients</Text>
          </Button>
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