import React, {useState, useContext} from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput } from "react-native";

import Button from "../components/Button";



import { AuthContext } from "../contexts/auth";

export default function SignUp({ navigation }) {

    const {signUp} = useContext(AuthContext)

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function handleSignUp(){
        signUp(nome, email, senha);
    }

    return(
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Cadastro</Text>
            </View>
            <View style={Styles.Container}>
                <Text style={Styles.Text}>Nome:</Text>
                <TextInput 
                    placeholder="Digite seu nome..."
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                    style={Styles.TextInput}
                />
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

                <Button text="Cadastrar" onPress={handleSignUp}/>

                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 22}}>
                        Já possui uma conta?
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
        backgroundColor: '#00695C'
        
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