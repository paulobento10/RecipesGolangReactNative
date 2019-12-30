import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Content, Header, Field, Left, Body, Right, Title, Form, Item, Input, Icon, Label, Button, Text, TextInput } from 'native-base';
import axios from 'axios';
import ShowContent from './ShowContent'
import { Keyboard } from 'react-native'



function ShowSearch(props) {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        //axios.get("http://192.168.1.68:8000/api/searchRecipeAll)
        axios.get("http://192.168.1.119:8000/api/searchRecipeAll")
        .then(result => {
            console.log(result.data)
            if (result.status==200) { 
                setRecipes(result.data);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
      }, []);
    
    const addEntryClick = () => {
        //axios.get("http://192.168.1.68:8000/api/searchRecipeName/name/"+search.text)
        axios.get("http://192.168.1.119:8000/api/searchRecipeName/name/"+search.text)
        .then(result => {
            console.log(result.data)
            if (result.status==200) { 
                setRecipes(result.data);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    };

    return (
        <Content padder>
            <Item>
                <Icon name="ios-menu" /*menu???*//>
                <Input placeholder="Search" onChangeText={(text) => setSearch({text})} returnKeyType={"search"} onSubmitEditing={()=>{ addEntryClick(); Keyboard.dismiss();}} blurOnSubmit={true} />
            </Item>
            <ShowContent recipes={recipes} />
        </Content>
    );
}

export default ShowSearch;