import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Show from './Pages/Show'
import Recipe from './Pages/Recipe'
import Insert from './Pages/Insert'
import UserCreations from './Pages/UserCreations'

function App(props) {
  return (
      <Router>
        <Scene key = "root">
          <Scene key = "signin" component = {SignIn} hideNavBar={true} initial = {true}/>
          <Scene key = "signup" component = {SignUp} hideNavBar={true} />
          <Scene key = "show" component = {Show} hideNavBar={true} />
          <Scene key = "recipe" component = {Recipe} hideNavBar={true} />
          <Scene key = "insert" component = {Insert} hideNavBar={true} />
          <Scene key = "usercreations" component = {UserCreations} hideNavBar={true} />
        </Scene>
      </Router>
  );
};

export default App;
