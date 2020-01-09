import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Content, Header, Field, Left, Body, Right, Title, Form, Item, Input, Label, Button, Text, TextInput } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ShowContent from './ShowContent'
import { Keyboard } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Dropdown } from 'react-native-material-dropdown';

function ShowSearch(props) {

    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [dataIngredients, setDataIngredients] = useState([]);
    const [searchByMeal, setSearchByMeal] = useState(false);
    const [meal, setMeal] = useState("");
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

        getAll();

        //axios.get("http://192.168.1.68:8000/api/searchIngredientAll")
        axios.get("http://192.168.1.119:8000/api/searchIngredientAll")
        .then(resulti => {
            if (resulti.status==200) { 
                setDataIngredients([]);
                for (let ingObject of resulti.data) {
                    var ing= ingObject.ingredient_name;
                    setDataIngredients(dataIngredients =>[...dataIngredients, {value: ing}])
                }
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
      }, []);
    
    const searchGet = () => {
        //axios.get("http://192.168.1.68:8000/api/searchRecipeName/name/"+search.text)
        axios.get("http://192.168.1.119:8000/api/searchRecipeName/name/"+search.text)
        .then(result => {
            console.log(result)
            if (result.status==200) { 
                setRecipes(result.data);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    };

    const getAll = () => {
        //axios.get("http://192.168.1.68:8000/api/searchRecipeAll")
        axios.get("http://192.168.1.119:8000/api/searchRecipeAll")
        .then(result => {
            if (result.status==200) { 
                setRecipes(result.data);
                setSearchByMeal(false)
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    const mealGet = () => {
        //axios.get("http://192.168.1.68:8000/api/searchRecipeCategory/category/"+meal.value)
        axios.get("http://192.168.1.119:8000/api/searchRecipeCategory/category/"+meal.value)
        .then(result => {
            console.log(result.data);
            if (result.status==200) { 
                setRecipes(result.data);
                setSearchByMeal(false)
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    };

    const ingredientGet = () => {
        //axios.get("http://192.168.1.68:8000/api/searchIngredientName/name/"+ingredient.value)
        axios.get("http://192.168.1.119:8000/api/searchRecipeNameTotal/name/"+ingredient.value) 
        .then(result => {
            console.log(result.data);
            if (result.status==200) { 
                setRecipes(result.data);
                setSearchByMeal(false)
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    };

    const menuPress = () => {
        if(searchByMeal==false){
            setSearchByMeal(true)
        } else {
            setSearchByMeal(false)
        }
    }
    
    return (
        <Content padder>
            <Item>
                <Icon name="bars" style={{fontSize: 30}} onPress={menuPress} />
                <Input placeholder="Search" onChangeText={(text) => setSearch({text})} returnKeyType={"search"} onSubmitEditing={()=>{ searchGet(); Keyboard.dismiss();}} blurOnSubmit={true} />
            </Item>
            <Content>
            { searchByMeal &&
                <Grid>
                    <Row style={{alignSelf: 'center'}}> 
                        <Col style={{ width: 250 }}>
                            <Dropdown
                                label='Search by type of meal'
                                data={dataType}
                                onChangeText={(value) => setMeal({value})}
                            />
                        </Col>
                        <Col style={{display: "flex" , marginTop: "7%"}}>
                        <Button transparent onPress={mealGet}>
                            <Text>Search</Text>
                        </Button>
                        </Col>
                    </Row>
                    <Row style={{alignSelf: 'center'}}> 
                        <Col style={{ width: 250 }}>
                            <Dropdown
                                label='Search by ingredient'
                                data={dataIngredients}
                                onChangeText={(value) => setIngredient({value})}
                            />
                        </Col>
                        <Col style={{display: "flex" , marginTop: "7%"}}>
                        <Button transparent onPress={ingredientGet}>
                            <Text>Search</Text>
                        </Button>
                        </Col>
                    </Row>
                    <Row style={{alignSelf: 'center'}}> 
                    <   Button transparent onPress={getAll}>
                            <Text>Get All</Text>
                        </Button>
                    </Row>
                </Grid>
            }
            </Content>
            <ShowContent user_id={props.user_id} recipes={recipes} />
        </Content>
    );
}

export default ShowSearch;