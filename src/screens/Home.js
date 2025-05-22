import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

import { db } from "../firebaseConnection";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

import Button from "../components/Button";
import ContaCard from "../components/ContaCard";
import CartaoCard from "../components/CartaoCard";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {

    const contas = [
        { id: '1', nome: 'Nubank', saldo: 2500 },
        { id: '2', nome: 'Carteira', saldo: 150 },
    ];

    const [nome, setNome] = useState('Carregando...');
    const [saldoTotal, setSaldoTotal] = useState(0);    

    useEffect(() => {
        
        async function getDados() {

            const docref = doc(db, "users", "0")

            getDoc(docref)
            .then((snapshot) => {
                setNome(snapshot.data()?.nome)
            }).catch((err) => {
                console.log("error: ")
                console.log(err)
            })
        }

        getDados();
    }, [])




    return(
        <SafeAreaView style={styles.View}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.HeaderContainer}>
                    <Text style={styles.Title}>Bem vindo {nome}!</Text>
                    <Text style={styles.Text}>Saldo atual: R${saldoTotal.toFixed(2)}</Text>
                </View>

                <View style={styles.AppContainer}>
                    <View>
                        <Text style={styles.ContainerTitle}>Contas</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={styles.ScrollContent}
                        >
                            {contas.map((conta) => (
                                <ContaCard key={conta.id} nome={conta.nome} saldo={conta.saldo} />
                            ))}

                            
                            <TouchableOpacity
                                style={styles.AddCard}
                                onPress={() => navigation.navigate('NovaConta')}
                                activeOpacity={0.7}
                                >
                                <Icon name="add" size={40} color="#fff" />
                            </TouchableOpacity>
                            
                            
                        </ScrollView>
                    </View>

                    <View>
                        <Text style={styles.ContainerTitle}>Cartões</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={styles.ScrollContent}
                        >
                            {contas.map((conta) => (
                                <CartaoCard key={conta.id} nome={conta.nome} limite={conta.saldo} />
                            ))}

                            
                            <TouchableOpacity
                                style={styles.AddCard}
                                onPress={() => navigation.navigate('NovoCartao')}
                                activeOpacity={0.7}
                                >
                                <Icon name="add" size={40} color="#fff" />
                            </TouchableOpacity>
                            

                            
                        </ScrollView>
                    </View> 
                            
                    <Button text={'Perfil'} onPress={() => navigation.navigate("Profile")}/>      
                </View>
            </ScrollView>           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    View:{ 
        flex: 1,
        backgroundColor: '#00695C',
        
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

    Text:{
        marginHorizontal: 'auto',
        fontSize: 30,
        color: '#FFF'
    },
    
    AppContainer:{
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    ScrollContent: {
        
        flexDirection: 'row',


    },

    AddCard: {
        backgroundColor: '#00695C',
        width: 150,
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },

    ContainerTitle:{
        fontSize: 25
    }
})