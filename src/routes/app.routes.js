import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NovaConta from "../screens/NovaConta";
import NovoCartao from "../screens/NovoCartao"

const Stack = createNativeStackNavigator(); 

function AppRoutes(){

  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="NovaConta" component={NovaConta}/>
        <Stack.Screen name="NovoCartao" component={NovoCartao}/>
      </Stack.Navigator>
  );
}

export default AppRoutes;