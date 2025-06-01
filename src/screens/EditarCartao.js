import React, { useState } from "react";
import {SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Button from '../components/Button';

export default function EditarCartao({navigation}){

    const [nome, setNome] = useState('Carregando...')
    const [saldo, setSaldo] = useState(0);

    return(
        <SafeAreaView style={styles.View}>

            <View style={styles.HeaderContainer}>
                <Text style={styles.Title}>Edite os dados do seu cartão de crédito!</Text>
            </View> 

            <View style={styles.AppContainer}>

                <Text style={styles.Label}>Nome:</Text>
                <View style={styles.TextInputContainer}>
                    
                    <TextInput 
                        style={styles.TextInput}
                        placeholder="ex. Nubank"
                    >
                        
                        {nome}
                    </TextInput>
                </View>

                <Text style={styles.Label}>Limite:</Text>
                <View style={styles.TextInputContainer}>
                    
                    <Text style={{fontSize: 23}}>R$</Text>
                    
                    <TextInput 
                        style={styles.TextInput}
                        keyboardType="numeric"
                        placeholder="ex. R$200.50"
                    >
                        
                        {saldo.toFixed(2)}
                    </TextInput>
                </View>
                
                <Text style={styles.Label}>Fatura:</Text>
                <View style={styles.TextInputContainer}>
                    
                    <Text style={{fontSize: 23}}>R$</Text>
                    
                    <TextInput 
                        style={styles.TextInput}
                        keyboardType="numeric"
                        placeholder="ex. R$200.50"
                    >
                        
                        {saldo.toFixed(2)}
                    </TextInput>
                </View>
                    
                <Button text="Salvar" onPress={() => navigation.goBack()}/>

            </View> 

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    View:{ 
        flex: 1,
        backgroundColor: '#00695C'        
    },
    
    HeaderContainer:{
        padding: 20
    },

    Title:{
        marginHorizontal: 'auto',
        marginVertical: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    },

    AppContainer:{
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minHeight: '100%',
        flexGrow: 1
    },

    Label:{
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: 10
    },

    TextInputContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    TextInput:{
        flex: 1,
        fontSize: 23
    }
})