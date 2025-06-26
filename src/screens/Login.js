import React, {useState, useContext} from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, View, Modal, ActivityIndicator } from "react-native";

import { AuthContext } from "../contexts/auth";

import { auth } from "../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import Button from "../components/Button";

export default function Login({ navigation  }) {

    const {login, loadingAuth} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [authUser, setAuthUser] = useState(null)

    const [errors, setErrors] = useState({})

    function validarCampos() {
        let e = {}

        if (!senha) e.geral = "A senha não pode ficar vazia"
        if (!email) e.geral = "O email não pode ficar vazio"
                
        if(senha && senha.length < 8) e.geral = "A senha não pode ter menos de 8 caractéres"
                
        setErrors(e)
        return Object.keys(e).length === 0;
       
    }

    async function handleLogin(){

        if (!validarCampos()) {
            return;
        }

        const erro = await login(email, senha)

        if(erro) setErrors((prev) => ({ ...prev, geral: erro }))
    }

    return(
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Login</Text>
            </View>            
            <View style={Styles.Container}>

                {errors.geral ? <Text style={Styles.Erro}>{errors.geral}</Text> : null}

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

                

                <View style={{ alignItems: 'center', marginTop: 4}}>
                    <Text style={{fontSize: 21}}>
                        Esqueceu sua senha?
                            <Text 
                                style={Styles.TextLink} 
                                onPress={() => navigation.navigate("Senha")}> Clique aqui!
                            </Text>
                    </Text>
                </View>

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={loadingAuth}
                    onRequestClose={() => {}}
                >
                    <View style={Styles.ModalBackground}>
                    <View style={Styles.ActivityIndicatorWrapper}>
                        <ActivityIndicator size="50" color="#00695C" />
                        <Text style={{ marginTop: 10, fontSize: 20 }}>Entrando...</Text>
                    </View>
                    </View>
                </Modal>

                <Button text="Entrar" onPress={handleLogin}/>

                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 21}}>
                        Não possui uma conta?
                            <Text 
                                style={Styles.TextLink} 
                                onPress={() => navigation.navigate("SignUp")}> Clique aqui!
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

    Erro: {
        color: 'red',
        fontSize: 22,
        marginTop: 4,
        marginLeft: 4,
    },
    ModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ActivityIndicatorWrapper: {
        backgroundColor: 'white',
        height: 150,
        width: 170,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})