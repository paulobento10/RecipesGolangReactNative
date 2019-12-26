/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { useState, /*useCallback,*/ useEffect } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {                 //aqui iremos preencher o array das receitas (default) logo após o render (get de allrecipes)
    axios.get('http://192.168.1.119:8000/api/searchUser/id/1') //http://jsonplaceholder.typicode.com/todos/1
    //axios.get('http://192.168.1.68:8000/api/searchUser/id/1') //http://jsonplaceholder.typicode.com/todos/1
    .then(function (response) {
      console.log(response.data);
      setUser(response.data[0].user_name);
      setEmail(response.data[0].email);
      setPassword(response.data[0].password);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);


  return (
    <>
    <Text>User: {user}</Text>
    <Text>Email: {email}</Text>
    <Text>Password: {password}</Text>
    </> 
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
