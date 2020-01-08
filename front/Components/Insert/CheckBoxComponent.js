import React, { Component } from 'react';                         
import {TextInput, StyleSheet, View, Text} from 'react-native';   
import { CheckBox, ListItem, List } from 'react-native-elements';  
const CheckBoxComponent = ({title, checked}) => {
return (
    <CheckBox
        title={title}
        checkedColor='#0D4A8E'
        checked={checked}
        />
);};

export { CheckBoxComponent };