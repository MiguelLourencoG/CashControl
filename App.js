import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/screens/Start';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';

import NovaConta from "./src/screens/NovaConta";
import NovoCartao from "./src/screens/NovoCartao";

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="NovaConta" component={NovaConta}/>
        <Stack.Screen name="NovoCartao" component={NovoCartao}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

