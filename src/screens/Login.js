import React, {useState} from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { auth } from "../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import Button from "../components/Button";

export default function Login({ navigation  }) {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [authUser, setAuthUser] = useState(null)

    async function handleLogin(){
        const user = await signInWithEmailAndPassword(auth, email, senha)
        .then((user) => {
            console.log(user)
            setAuthUser({
                email: user.user.email,
                uid: user.user.uid
            })
            navigation.replace("Home")
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Login</Text>
            </View>            
            <View style={Styles.Container}>
                <Text style={Styles.Text}>Email:</Text>
                <TextInput 
                    placeholder="Digite seu email..."
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={Styles.TextInput}
                />
                <Text style={Styles.Text}>Senha:</Text>
                <TextInput 
                    placeholder="Digite sua senha..."
                    autoCapitalize="none"
                    secureTextEntry
                    autoCorrect={false}
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                    style={Styles.TextInput}
                />
                <Button text="Entrar" onPress={handleLogin}/>

                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 22}}>
                        Não possui uma conta?
                            <Text 
                                style={Styles.TextLink} 
                                onPress={() => navigation.navigate("Login")}> Clique aqui!
                            </Text>
                    </Text>
                </View>
            
            </View>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    View:{
        flex: 1,        
        backgroundColor: '#00695C',
        
    },

    TitleContainer:{
        flex: 1,
        justifyContent: 'center',
    },

    Container:{
        flex: 4,
        justifyContent: 'flex-start',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    Title:{
        marginHorizontal: 'auto',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20
    },

    Text:{
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: 10
    },

    TextInput: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        fontSize: 23,
        color: '#212121',
    },

    TextLink:{
        color: '#00695C', 
        fontWeight: 'bold',
        
    }
})