import React, {createContext, useState, useEffect} from "react";

import { auth, db } from "../firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";
import { setDoc, doc, collection } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false)

    const navigation = useNavigation();


    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem("@user")
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }

        loadStorage();
    }, [])

    async function signUp(nome, email, senha) {
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                nome: nome,
                email: email,             
            }).then(() => {
                console.log("Tudo nos trinques")
                login(email, senha)
            })
        }catch(error){
            console.log(error)
        }
    }

    async function login(email, senha) {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            setUser(user);
            await AsyncStorage.setItem("@user", JSON.stringify(user));

        }catch(error){
            console.log(error)
        }       
    }

    async function logout() {
        try {
            await AsyncStorage.clear().then(() => {
                setUser(null);
            });
            
        } catch (error) {
            console.log(error)
        }
        
    }


    return(
        <AuthContext.Provider value={{signed: !!user, user, loadingAuth, signUp, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;