import React, {useState, useContext} from "react";
import { SafeAreaView, View, Text, StyleSheet, Modal, ActivityIndicator, TextInput } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import Button from "../components/Button";



import { AuthContext } from "../contexts/auth";

export default function SignUp({ navigation }) {

    const {signUp, loadingAuth} = useContext(AuthContext)

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    const [errors, setErrors] = useState({})

    function validarCampos() {
        let e = {}
    
        if(senha && senha.length < 8) e.geral = "Senha não pode ter menos de 8 caractéres"

        if (!senha) e.geral = "A senha não pode ficar vazio"
        if (!email) e.geral = "O email não pode ficar vazio"
        if (!nome) e.geral = "O nome não pode ficar vazio"
        

        setErrors(e)
        return Object.keys(e).length === 0;
       
    }


    function handleSignUp(){
        if (!validarCampos()) {
            return;
        }
        const erro = signUp(nome, email, senha);

        if(erro) setErrors((prev) => ({ ...prev, geral: erro }))
    }

    return(
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Cadastro</Text>
            </View>
            <View style={Styles.Container}>

                {errors.geral ? <Text style={Styles.Erro}>{errors.geral}</Text> : null}

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

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={loadingAuth}
                    onRequestClose={() => {}}
                >
                    <View style={Styles.modalBackground}>
                    <View style={Styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="50" color="#00695C" />
                        <Text style={{ marginTop: 10, fontSize: 20 }}>Entrando...</Text>
                    </View>
                    </View>
                </Modal>

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
        
    },

    Erro: {
        color: 'red',
        fontSize: 22,
        marginTop: 4,
        marginLeft: 4,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicatorWrapper: {
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