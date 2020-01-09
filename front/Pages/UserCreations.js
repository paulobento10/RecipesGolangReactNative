import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Container, Body, Right, Icon, Button, Title, Text, Content } from 'native-base';
import Search from '../Components/Show/ShowSearch';
import Header from '../Components/Show/ShowHeader';
import axios from 'axios';

function UserCreations(props) {

  const [isError, setIsError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    //axios.get("http://192.168.1.68:8000/api/searchUserRecipe/id/{id}"+props.user_id)
    axios.get("http://192.168.1.119:8000/api/searchUserRecipe/id/"+props.user_id)
    .then(result => {
        if (result.status==200) {
          console.log(result.data)
            setRecipes(result.data)
        } else {
            setIsError(true);
        }
    }).catch(e => {
        setIsError(true);
    });
  }, []);

  return (
    <Content padder>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Creations of user Nrº {props.user_id} (Undone){"\n\n"}</Text>
          <Text style={{fontWeight: 'bold'}}>Recipes:</Text>
          {recipes && recipes.length > 0 && recipes.map(val => (
              <Text>{val.recipe_name}</Text>
          ))}
    </Content>
  );
}

export default UserCreations;