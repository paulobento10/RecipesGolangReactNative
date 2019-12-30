import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Content, Header, Field, Left, Body, Right, Title, Form, Item, Input, Label, Button, Text, TextInput } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ShowContent from './ShowContent'
import { Keyboard } from 'react-native'

import { Dropdown } from 'react-native-material-dropdown';

import { Platform, StyleSheet, View, Alert, YellowBox} from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";



function ShowSearch(props) {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [isError, setIsError] = useState(false);
    const [searchByMeal, setSearchByMeal] = useState(false);
    const [data, setData] = useState([{
        value: 'Breakfast & Brunch',
      }, {
        value: 'Lunch/Dinner',
      }, {
        value: 'Desert',
      }, {
        value: 'Appetizers & Snacks',
      },{
        value: 'Drinks',
      },]);
      const [meal, setMeal] = useState("");

    useEffect(() => {
        //axios.get("http://192.168.1.68:8000/api/searchRecipeAll)
        axios.get("http://192.168.1.119:8000/api/searchRecipeAll")
        .then(result => {
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
            if (result.status==200) { 
                setRecipes(result.data);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    };

    const menuPress = () => {
        console.log(meal);
        if(searchByMeal==false){
            setSearchByMeal(true)
        } else {
            setSearchByMeal(false)
            //setMeal("");
        }
    }
    
    return (
        <Content padder>
            <Item>
                <Icon name="bars" style={{fontSize: 30}} onPress={menuPress} />
                <Input placeholder="Search" onChangeText={(text) => setSearch({text})} returnKeyType={"search"} onSubmitEditing={()=>{ addEntryClick(); Keyboard.dismiss();}} blurOnSubmit={true} />
            </Item>
            { searchByMeal &&
                <Dropdown
                label='Search by type of meal'
                data={data}
                onChangeText={(value) => setMeal({value})}
                />
            }
            <ShowContent recipes={recipes} />
        </Content>
    );
}

export default ShowSearch;