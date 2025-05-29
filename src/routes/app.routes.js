import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NovaConta from "../screens/NovaConta";
import NovoCartao from "../screens/NovoCartao"
import Transacoes from "../screens/Transacoes";
import Cartoes from "../screens/Cartoes";
import Contas from "../screens/Contas";
import VerCartao from "../screens/VerCartao";

const Stack = createNativeStackNavigator(); 

function AppRoutes(){

  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="NovaConta" component={NovaConta}/>
        <Stack.Screen name="NovoCartao" component={NovoCartao}/>
        <Stack.Screen name="Transacoes" component={Transacoes}/>
        <Stack.Screen name="Cartoes" component={Cartoes}/>
        <Stack.Screen name="Contas" component={Contas}/>
        <Stack.Screen name="VerCartao" component={VerCartao}/>
      </Stack.Navigator>
  );
}

export default AppRoutes;