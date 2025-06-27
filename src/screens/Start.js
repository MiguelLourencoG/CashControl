import React, {useEffect} from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "../components/Button";

export default function Start({ navigation }) {    

    return(
        <SafeAreaView style={Styles.View}>
            <View style={Styles.LogoContainer}>
                <Image 
                    source={require('../../assets/Cash Control Logo.png')}
                    style={{width: '100%'}}
                    resizeMode="contain"
                />
            </View>
            <View style={Styles.Container}>
                <View>
                    <Text style={Styles.Title}>Seja bem vindo!</Text>
                    <View style={Styles.Line} />
                    <Text style={Styles.Text}>Bora ver por onde anda seu dinheiro?</Text>
                </View>
                <View style={{bottom: 30}}>                    
                    <Text style={Styles.TextBottom}>Vamos começar criando uma conta</Text>
                    <Button text={'Criar Conta'} onPress={() => navigation.navigate("SignUp")}/>
                                        
                    <Text style={{fontSize: 20, textAlign: 'center'}}>
                        Já possui uma conta?
                            <Text 
                            style={Styles.TextLink} 
                            onPress={() => navigation.navigate("Login")}> Clique aqui!</Text>
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
    
    LogoContainer:{
        flex: 1.3,
        justifyContent: "center"
    },

    Container:{
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 25,
        justifyContent: 'space-evenly'
    },
    Title:{
        marginHorizontal: 'auto',
        marginBottom: 5,
        fontSize: 42,
        fontWeight: 'bold'
    },

    Line:{
        borderBottomWidth: 0.5,
        marginBottom: 5
    },

    Text:{
        fontSize: 33,
        textAlign: 'center',
        marginBottom: 5
    },

    TextBottom:{
        fontSize: 20,
        textAlign: 'center',
        bottom: -10
    },

    Button: {
        backgroundColor: '#00695C',
        padding: 12,
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    ButtonText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
    },

    TextLink:{
        color: '#00695C', 
        fontWeight: 'bold'
    }
})