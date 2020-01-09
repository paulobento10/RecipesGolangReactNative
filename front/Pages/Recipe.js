import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Rating, AirbnbRating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';


function Recipe(props) {

    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState("");
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        setRecipe(props.propsRecipe.recipes)
        var id= props.propsRecipe.recipes.recipe_id;
        console.log(id)
        //axios.get("http://192.168.1.68:8000/api/getIngredientsByRecipeId/id/"+id)
        axios.get("http://192.168.1.119:8000/api/getIngredientsByRecipeId/id/"+id)
        .then(result => {
            console.log(result.data);
            if (result.status==200) {
                setIngredients(result.data)
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });

        //axios.get("http://192.168.1.68:8000/api/searchUser/id/"+props.propsRecipe.user_id)
        axios.get("http://192.168.1.119:8000/api/searchUser/id/"+props.propsRecipe.user_id)
        .then(result => {
            if (result.status==200) {
                setUser(result.data[0].user_name)
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
      }, []);
    
    return (
        <Content padder>
            <View>
            <Image
            resizeMode={'cover'}
            style={{ width: '100%', height: 250 }}
            source={{uri: recipe.picture}}
            />
            </View>
            <Text h1 style={{fontSize: 30, fontWeight: 'bold'}}>{recipe.recipe_name}</Text>
            <Text style={{fontSize: 20}}>{recipe.category}{"\n"}</Text>
            <Text style={{color: '#787878'}}>{recipe.recipe_description}{"\n"}</Text>
            <Text numberOfLines={2} style={{ textAlign: 'center', width: 300 }}><Icon name='clock-o' style={{fontSize: 18}}/> {recipe.duration}m    |     <Icon name="bar-chart-o" style={{fontSize: 18}}/> {recipe.kcal}kcal{"\n"}</Text>
            {ingredients.length > 0 && <Text style={{textAlign: 'left', fontWeight: 'bold', fontSize: 20}}>Ingredients:</Text> }
            {ingredients && ingredients.length > 0 && ingredients.map(val => (
                <Text><Icon name="circle" style={{fontSize: 9}}/> {val.ingredient_name}</Text>
            ))}
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Fair", "Good", "Very Good", "Amazing"]}
            defaultRating={4}
            size={20}
            />
            {ingredients.length > 0 && <Text style={{textAlign: 'right', fontSize: 15}}>Author: {user}</Text> }
        </Content>
    );
}

export default Recipe;