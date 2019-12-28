import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Content, Header, Field, Left, Body, Right, Title, Form, Item, Input, Icon, Label, Button, Text, TextInput } from 'native-base';
import axios from 'axios';
import ShowContent from './ShowContent'
import { Keyboard } from 'react-native'



function ShowSearch(props) {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {                 //aqui iremos preencher o array das receitas (default) logo após o render (get de allrecipes)
        setRecipes([
          ...recipes,
          {
            id: 1,
            label: "Joao"
          }
        ]);
      }, []);
    
    const addEntryClick = () => {     //aqui iremos atualizar o array das receitas para as receitas pesquisadas (resposta ao get da pesquisa)
        setRecipes([
            ...recipes,
            {
            id: (recipes[(recipes.length-1)].id)+1,
            label: search.text
            }
        ]);
    };

    return (
        <Content padder>
            <Item>
                <Icon name="ios-menu" /*menu???*//>
                <Input placeholder="Search" onChangeText={(text) => setSearch({text})} returnKeyType={"search"} onSubmitEditing={()=>{ addEntryClick(); Keyboard.dismiss();}} blurOnSubmit={false} />
            </Item>
            <ShowContent recipes={recipes} />
        </Content>
    );
}

export default ShowSearch;