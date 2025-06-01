import React, { useState } from "react";
import {SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Button from '../components/Button';

export default function VerConta( {navigation} ){



    const [nome, setNome] = useState('Carregando...')
    const [saldo, setSaldo] = useState(0);

    return(
        <SafeAreaView style={styles.View}>

            <View style={styles.HeaderContainer}>
                <Text style={styles.Title}>{nome}</Text>
            </View> 

            <View style={styles.AppContainer}>
                <Text style={styles.Label}>Saldo</Text>
                <Text style={styles.TextInput}>R${saldo.toFixed(2)}</Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between"
                }}>
                    <TouchableOpacity style={styles.EditButton} onPress={() => navigation.navigate('EditarConta')}>
                        <Text style={styles.ButtonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.DeleteButton}>
                        <Text style={styles.ButtonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
                

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
        color: '#FFF'
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

    EditButton:{
        backgroundColor: '#00695C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
        width: '48%'
    },

    DeleteButton:{
        backgroundColor: '#A00',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
        width: '48%'
    },

    ButtonText:{
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    }
})