import React, {useState, useContext} from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";

import { AuthContext } from "../contexts/auth";

import { auth } from "../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import Button from "../components/Button";

export default function Login({ navigation  }) {

    const {resetSenha} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [authUser, setAuthUser] = useState(null)

    const [mensagem, setMensagem] = useState(null)

    async function handleSenha(){
        setMensagem(null);
        const erro = await resetSenha(email);

        if (erro) {
            setMensagem({ tipo: "erro", texto: erro });
        } else {
            setMensagem({ tipo: "sucesso", texto: "Email de recuperação enviado com sucesso! Se não encontrar, verifique o spam ou a lixeira!" });
        }
    }

    return(
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Esqueci a senha</Text>
            </View>            
            <View style={Styles.Container}>
                {mensagem && (
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: mensagem.tipo === "erro" ? "red" : "#00695C",
                        marginBottom: 10
                    }}>
                        {mensagem.texto}
                    </Text>
                )}


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
                               
                <SafeAreaView>
                    <TouchableOpacity style={Styles.Button} onPress={handleSenha}>
                        <Text style={Styles.ButtonText}>Enviar email de recuperação</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 21}}>
                        Deseja voltar ao login?
                            <Text 
                                style={Styles.TextLink} 
                                onPress={() => navigation.goBack()}> Clique aqui!
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
        
    },
    Button: {
        backgroundColor: '#00695C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    ButtonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
    },
})