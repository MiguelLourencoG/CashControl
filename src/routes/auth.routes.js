import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Start from '../screens/Start';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator(); 

function AuthRoutes(){

  return (
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}

export default AuthRoutes;