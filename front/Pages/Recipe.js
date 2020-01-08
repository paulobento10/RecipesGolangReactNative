import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Container, Header, Body, Right, Icon, Button, Title, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

function Recipe(props) {

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        setRecipe(props.propsRecipe.recipes)
      }, []);
    
    return (
        <Container>
            <Text>User ID: {props.propsRecipe.user_id}</Text>
            <Text>Recipe Name: {recipe.recipe_name}</Text>
        </Container>
    );
}

export default Recipe;