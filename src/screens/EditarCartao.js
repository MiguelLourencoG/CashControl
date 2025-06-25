import React, { useState, useEffect } from "react";
import {SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConnection';
import Button from '../components/Button';

export default function EditarCartao({navigation}){

    const { id } = useRoute().params;
    
    const [nome, setNome] = useState('Carregando...')
    const [limite, setLimite] = useState(0);
    const [fatura, setFatura] = useState(0)

    useEffect(() => {
        async function carregarCartao() {
            try {
                const cartaoSnap = await getDoc(doc(db, "cartoes", id));

                if (cartaoSnap) {
                    const data = cartaoSnap.data();
                    setNome(data.nome);
                    setLimite(String(data.limite.toFixed(2)))
                    setFatura(String(data.fatura.toFixed(2)))
                } else {
                    console.log("Cartão não encontrado");
                }
            } catch (error) {
                console.error("Erro ao carregar cartão:", e);
            }
        }

        carregarCartao();
    }, []);

    async function salvarAlteracoes() {
        try {
            await updateDoc(doc(db, "cartoes", id), {
                nome,
                limite: parseFloat(limite),
                fatura: parseFloat(fatura)
            });
            navigation.goBack();
            console.log("Cartão atualizado!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    }

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
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <Text style={styles.Label}>Limite:</Text>
                <View style={styles.TextInputContainer}>
                    
                    <Text style={{fontSize: 23}}>R$</Text>
                    
                    <TextInput 
                        style={styles.TextInput}
                        keyboardType="numeric"
                        placeholder="ex. R$200.50"
                        value={limite}
                        onChangeText={setLimite}
                    />
                </View>
                
                <Text style={styles.Label}>Fatura:</Text>
                <View style={styles.TextInputContainer}>
                    
                    <Text style={{fontSize: 23}}>R$</Text>
                    
                    <TextInput 
                        style={styles.TextInput}
                        keyboardType="numeric"
                        placeholder="ex. R$200.50"
                        value={fatura}
                        onChangeText={setFatura}
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