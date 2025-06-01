import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NovaConta from "../screens/NovaConta";
import NovoCartao from "../screens/NovoCartao";
import NovaTransacao from "../screens/NovaTransacao";
import NovaPendencia from "../screens/NovaPendencia";
import Cartoes from "../screens/Cartoes";
import Contas from "../screens/Contas";
import Transacoes from "../screens/Transacoes";
import Pendencias from "../screens/Pendencias";
import VerCartao from "../screens/VerCartao";
import VerConta from "../screens/VerConta";
import VerTransacao from "../screens/VerTransacao";
import EditarConta from "../screens/EditarConta";
import EditarCartao from "../screens/EditarCartao";
import EditarTransacao from "../screens/EditarTransacao";
import EditarPendencia from "../screens/EditarPendencia";

const Stack = createNativeStackNavigator(); 

function AppRoutes(){

  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="NovaConta" component={NovaConta}/>
        <Stack.Screen name="NovoCartao" component={NovoCartao}/>
        <Stack.Screen name="NovaTransacao" component={NovaTransacao}/>
        <Stack.Screen name="NovaPendencia" component={NovaPendencia}/>        
        <Stack.Screen name="Cartoes" component={Cartoes}/>
        <Stack.Screen name="Contas" component={Contas}/>
        <Stack.Screen name="Transacoes" component={Transacoes}/>
        <Stack.Screen name="Pendencias" component={Pendencias}/>
        <Stack.Screen name="VerCartao" component={VerCartao}/>
        <Stack.Screen name="VerConta" component={VerConta}/>
        <Stack.Screen name="VerTransacao" component={VerTransacao}/>
        <Stack.Screen name="EditarConta" component={EditarConta}/>
        <Stack.Screen name="EditarCartao" component={EditarCartao}/>
        <Stack.Screen name="EditarTransacao" component={EditarTransacao}/>
        <Stack.Screen name="EditarPendencia" component={EditarPendencia}/>
      </Stack.Navigator>
  );
}

export default AppRoutes;