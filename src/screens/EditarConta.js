import React, { useState, useEffect } from "react";
import {SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConnection';
import Button from '../components/Button';

export default function EditarConta({navigation}){

    const { id } = useRoute().params;

    const [nome, setNome] = useState('Carregando...')
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        async function carregarConta() {
            try {
                const contaSnap = await getDoc(doc(db, "contas", id));

                if (contaSnap) {
                    const data = contaSnap.data();
                    setNome(data.nome);
                    setSaldo(String(data.saldo.toFixed(2)))
                } else {
                    console.log("Conta não encontrada");
                }
            } catch (error) {
                console.error("Erro ao carregar conta:", e);
            }
        }

        carregarConta();
    }, []);

    async function salvarAlteracoes() {
        try {
            await updateDoc(doc(db, "contas", id), {
                nome,
                saldo: parseFloat(saldo),
            });
            navigation.goBack();
            console.log("Conta atualizada!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    }

    return(
        <SafeAreaView style={styles.View}>

            <View style={styles.HeaderContainer}>
                <Text style={styles.Title}>Edite os dados da sua conta bancária!</Text>
            </View> 

            <View style={styles.AppContainer}>
                <Text style={styles.Label}>Nome:</Text>

                <View style={styles.TextInputContainer}>
                    <TextInput 
                        style={styles.TextInput}
                        placeholder="ex. Carteira"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <Text style={styles.Label}>Saldo:</Text>

                <View style={styles.TextInputContainer}>
                    {
                        <Text style={{fontSize: 23}}>R$</Text>
                    }
                    <TextInput 
                        style={styles.TextInput}
                        keyboardType="numeric"
                        placeholder="ex. R$200.50"                        
                        value={saldo}
                        onChangeText={setSaldo}
                    />
                </View>
                
                
                    
                <Button text="Salvar" onPress={salvarAlteracoes}/>

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
        marginTop: 10,
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