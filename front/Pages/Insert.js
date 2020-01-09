import React, { Component  } from "react";
import { useState, useEffect } from 'react';
import { Container, Content, Field,Left, Body, Right, Title, Form, Item, Input, Label, Button, Text, AppRegistry, TouchableOpacity, Image, Animated, ScrollView, StyleSheet, View} from 'native-base';
import Header from '../Components/Insert/InsertHeader';
import { Actions } from 'react-native-router-flux';
import {  ListItem } from 'native-base';
import { CheckBox } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import { renderers } from "react-native-popup-menu";

function InsertRecipe(props) {
  
  const [isError, setIsError] = useState(false);
  const [auxRecipes, setAuxRecipes] = useState();
  const [recipe_name, setRecipe_name] = useState("");
  const [recipe_description, setRecipe_description] = useState("");
  const [duration, setDuration] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [kcal, setKcal] = useState(0);
  const [user_id, setUser_id] = useState("");
  const [dataIngredients, setDataIngredients] = useState([]);
  const [dataType, setDataType] = useState([{
    value: 'Breakfast & Brunch',
  }, {
    value: 'Lunch & Dinner',
  }, {
    value: 'Desert',
  }, {
    value: 'Appetizers & Snacks',
  },{
    value: 'Drinks',
  },]);

  useEffect(() => {
    //axios.get("http://192.168.1.68:8000/api/searchIngredientAll")
    axios.get("http://192.168.1.119:8000/api/searchIngredientAll")
    .then(resulti => {
        if (resulti.status==200) { 
            setDataIngredients([]);
            for (let ingObject of resulti.data) {
                var ing= ingObject.ingredient_name;
                var ing_id= ingObject.ingredient_id;
                var ing_kcal= ingObject.kcal;
                setDataIngredients(dataIngredients =>[...dataIngredients, {id: ing_id, value: ing, checked: false, kcal: ing_kcal}])
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
      category: category.value,
      kcal: kcal.text,
      user_id: props.user_id
    }
    
    //axios.post("http://192.168.1.68:8000/api/insertRecipe", recipe)
    axios.post("http://192.168.1.119:8000/api/insertRecipe", recipe)
    .then(result => {
      if (result.data==true) {
        //axios.get("http://192.168.1.68:8000/api/searchRecipeExactName/name/" + recipe_name)
        axios.get("http://192.168.1.119:8000/api/searchRecipeExactName/name/" + recipe_name.text)
        .then(resulti => {
          if (resulti.status==200) { 
              setAuxRecipes(resulti.data[0].recipe_id);

              dataIngredients.forEach(element => {
                if(element.checked==true){
                  const elementIng = {
                    ingredient_id: element.id,
                    recipe_id: resulti.data[0].recipe_id,
                  }
                  //axios.post("http://192.168.1.68:8000/api/insertRecipeIngredients" elementIng)
                  axios.post("http://192.168.1.119:8000/api/insertRecipeIngredients", elementIng)
                  .then(resultj => {  
                    if (resultj.data==true) {
                      console.log('Success inserting ingredients');
                    } else {
                      console.log('Unsuccess inserting ingredients');
                      //console.log(result.data);
                      setIsError(true);
                    }
                  }).catch(e => {
                    setIsError(true);
                  });

                }
                
              });
              console.log("USER: "+props.user_id);
              Actions.show({user_id: props.user_id});
          } else {
              setIsError(true);
          }
        }).catch(e => {
            setIsError(true);
        });
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  const menuPress = () => {
    if(searchByMeal==false){
        setSearchByMeal(true)
    } else {
        setSearchByMeal(false)
    }
  }

  const onCheckChanged = (id) => {
    dataIngredients.forEach(element => {
      if(element.id==id){
        element.checked= (!element.checked)
        if(element.checked==true){
          var auxKcal= parseInt(kcal)+parseInt(element.kcal)
          setKcal(auxKcal);
        }
        else if(element.checked==false){
          var auxKcal= parseInt(kcal)-parseInt(element.kcal)
          setKcal(auxKcal);
        }
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
          <Grid>
            <Row style={{alignSelf: 'center'}}> 
                <Col style={{ width: 250 }}>
                    <Dropdown
                        label='Search by type of meal'
                        data={dataType}
                        onChangeText={(value) => setCategory({value})}
                    />
                </Col>
            </Row>
          </Grid>
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
            <Text onPress={post}>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default InsertRecipe;