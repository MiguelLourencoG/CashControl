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
import EditarConta from "../screens/EditarConta";
import EditarCartao from "../screens/EditarCartao";
import EditarTransacao from "../screens/EditarTransacao";
import EditarPendencia from "../screens/EditarPendencia";

const Stack = createNativeStackNavigator(); 

function AppRoutes(){

  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }}/>

        <Stack.Screen name="NovaConta" component={NovaConta} options={{ title: 'Nova conta' }}/>
        <Stack.Screen name="NovoCartao" component={NovoCartao} options={{ title: 'Novo cartão' }}/>
        <Stack.Screen name="NovaTransacao" component={NovaTransacao} options={{ title: 'Nova transação' }}/>
        <Stack.Screen name="NovaPendencia" component={NovaPendencia} options={{ title: 'Nova pendência' }}/>

        <Stack.Screen name="Cartoes" component={Cartoes} options={{ title: 'Ver Cartões' }}/>
        <Stack.Screen name="Contas" component={Contas} options={{ title: 'Ver contas' }}/>
        <Stack.Screen name="Transacoes" component={Transacoes} options={{ title: 'Ver Transações' }}/>
        <Stack.Screen name="Pendencias" component={Pendencias} options={{ title: 'Ver Pendências' }}/>

        <Stack.Screen name="EditarConta" component={EditarConta} options={{ title: 'Editar conta' }}/>
        <Stack.Screen name="EditarCartao" component={EditarCartao} options={{ title: 'Editar cartão' }}/>
        <Stack.Screen name="EditarTransacao" component={EditarTransacao} options={{ title: 'Editar transação' }}/>
        <Stack.Screen name="EditarPendencia" component={EditarPendencia} options={{ title: 'Editar pendência' }}/>
      </Stack.Navigator>
  );
}

export default AppRoutes;