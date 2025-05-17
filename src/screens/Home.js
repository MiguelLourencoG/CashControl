import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

import { db } from "../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

import Button from "../components/Button";
import ContaCard from "../components/ContaCard";
import CartaoCard from "../components/CartaoCard";
import Icon from 'react-native-vector-icons/MaterialIcons';



const saldo = 50.50//tem q ver como tratar esse numero de uma forma que pareça real
//De R$50.5 para R$50,50

export default function Home({ navigation }) {

    const contas = [
        { id: '1', nome: 'Nubank', saldo: 2500 },
        { id: '2', nome: 'Carteira', saldo: 150 },
    ];

    const [nome, setNome] = useState('Carregando...');

    useEffect(() => {

        async function getDados() {

            const docref = doc(db, "users", "0")

            getDoc(docref)
            .then((snapshot) => {
                setNome(snapshot.data().nome)
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
                    <Text style={styles.Text}>Saldo atual: R${saldo}</Text>
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
                            

                            {/* Card adicionar */}
                            
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
                                onPress={() => navigation.navigate('NovaConta')}
                                activeOpacity={0.7}
                                >
                                <Icon name="add" size={40} color="#fff" />
                            </TouchableOpacity>
                            

                            {/* Card adicionar */}
                            
                        </ScrollView>
                    </View> 
                    {/*<View>
                        <Text>Contas:</Text>
                        <ContaCard nome={'Nubank'} saldo={'200,00'}/>
                        <ContaCard nome={'Caixa'} saldo={'400,00'}/>

                        <Button text="Adicionar conta" onPress={() => navigation.navigate("NovaConta")}/>
                    </View>
                    <View>
                        <Text>Cartões:</Text>
                        <CartaoCard nome={'Nubank digital'} limite={'2000,00'}/>
                        <CartaoCard nome={'Nubank físico'} limite={'1500,00'}/>
                        
                        <Button text="Adicionar cartão" onPress={() => navigation.navigate("NovoCartao")}/>  
                    </View>*/}          
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