import React, {createContext, useState, useEffect} from "react";

import { auth, db } from "../firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";

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
            return null
        }catch(error){
            console.log(error)
            alert(error)

            if (error.code === 'auth/invalid-email') return "E-mail inválido";
            return "Erro ao realizar cadastro. Tente novamente.";
        }
    }

    async function login(email, senha) {
        try{

            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            setUser(user);
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            return null
        }catch(error){
            console.log(error)
            
            if (error.code === 'auth/wrong-password') return "Senha incorreta.";
            if (error.code === 'auth/missing-password') return "A senha não pode ficar vazia.";
            if (error.code === 'auth/invalid-email') return "E-mail inválido";
            if (error.code === 'auth/invalid-credential') return "Email ou senha incorretos"
            return "Erro ao fazer login. Tente novamente.";
            
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

    async function resetSenha(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return null;
    } catch (error) {
        console.log("Erro ao enviar email de recuperação:", error);

        if (error.code === 'auth/missing-email') return "O email não pode estar vazio"
        if (error.code === 'auth/invalid-email') return "E-mail inválido";
        return "Erro ao enviar o e-mail de recuperação.";
    }
}



    return(
        <AuthContext.Provider value={{signed: !!user, user, loadingAuth, signUp, login, logout, resetSenha}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;