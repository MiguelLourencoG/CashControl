import React, {useEffect, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { auth } from "./src/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

import Start from './src/screens/Start';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';

import NovaConta from "./src/screens/NovaConta";
import NovoCartao from "./src/screens/NovoCartao";

import Profile from "./src/screens/Profile";

import Routes from "./src/routes/index";

const Stack = createNativeStackNavigator(); 

export default function App() {

  {/*const [isSignedIn, setIsignedIn] = useState(false) 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>{
      if(user){          
        setIsignedIn(true)
        console.log(user.email)
        console.log(isSignedIn)
        return;
      }
    })
  }, [])*/}

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>

        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="NovaConta" component={NovaConta}/>
        <Stack.Screen name="NovoCartao" component={NovoCartao}/>
        <Stack.Screen name="Profile" component={Profile}/>

        {/*{isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="NovaConta" component={NovaConta}/>
            <Stack.Screen name="NovoCartao" component={NovoCartao}/>
            <Stack.Screen name="Profile" component={Profile}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          </>
          
        )}*/}
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

