import React, { Component  } from "react";
import { useState, useEffect } from 'react';
import { Container, Content, Field,Left, Body, Right, Title, Form, Item, Input, Label, Button, Text, AppRegistry, TouchableOpacity, Image, Animated, ScrollView, StyleSheet, View} from 'native-base';
import Header from '../Components/Insert/InsertHeader';
import { Actions } from 'react-native-router-flux';
import {  ListItem } from 'native-base';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { renderers } from "react-native-popup-menu";


function InsertRecipe(props) {
  
  const [isError, setIsError] = useState(false);
  const [recipe_name, setRecipe_name] = useState("");
  const [recipe_description, setRecipe_description] = useState("");
  const [duration, setDuration] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [kcal, setKcal] = useState("");
  const [user_id, setUser_id] = useState("");
  const [dataIngredients, setDataIngredients] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.1.68:8000/api/searchIngredientAll")
    //axios.get("http://192.168.1.119:8000/api/searchIngredientAll")
    .then(resulti => {
        if (resulti.status==200) { 
            setDataIngredients([]);
            for (let ingObject of resulti.data) {
                var ing= ingObject.ingredient_name;
                var ing_id= ingObject.ingredient_id;
                setDataIngredients(dataIngredients =>[...dataIngredients, {id: ing_id,value: ing, checked: false}])
            }
            (oldArray => [...oldArray, newElement]);
        } else {
            setIsError(true);
        }
    }).catch(e => {
        setIsError(true);
    });
  }, []);

  const post = () => {
    var recipe = {
      recipe_name: recipe_name.text,
      recipe_description: recipe_description.text,
      duration: duration.text,
      picture: picture.text,
      category: category.text,
      kcal: kcal.text,
      user_id: props.user_id
    }
    
    axios.post("http://192.168.1.68:8000/api/insertRecipe", recipe)
    //axios.post("http://192.168.1.119:8000/api/insertRecipe", recipe)
    .then(result => {  
      console.log(result.data);
      if (result.data==true) {

        for (let index = 0; index < dataIngredients.length; index++) {
          const element = {
            ingredient_id: dataIngredients[index],
            recipe_id: 15
          }
          axios.post("http://192.168.1.68:8000/api/insertRecipeIngredients", element)
          //axios.post("http://192.168.1.119:8000/api/insertRecipe", recipe)
          .then(result => {  
            console.log(result.data);
            if (result.data==true) {
              console.log('Success inserting ingredients');
              Actions.signin();
            } else {
              console.log('Unsuccess inserting ingredients');
              console.log(result.data);
              setIsError(true);
            }
          }).catch(e => {
            setIsError(true);
          });
        }

        //Actions.signin();
      } else {
        console.log(result.data);
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  const onCheckChanged = (id) => {
    dataIngredients.forEach(element => {
      if(element.id==id){
        element.checked= (!element.checked)
        console.log(element)
      }
    });
  }

  /*const getIngredients = () =>{
    var ingredients = {
      Ingredient_id:,
      Ingredient_name:,
      Kcal:,
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
  }*/

  return (
    <Container >
      <Header user_id={props.user_id}>
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
          { 
              dataIngredients.map(val =>
                <Content padder>
                  <CheckBox iconRight
                    center
                    iconRight
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    title={val.value} 
                    checked={val.checked}
                    onPress={() => onCheckChanged(val.id)}/>
                </Content>
              )
          }
          <Button style= {{ margin: 10 }} block primary onPress={post}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default InsertRecipe;