import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

import Button from "../components/Button";
import ContaCard from "../components/ContaCard";
import CartaoCard from "../components/CartaoCard";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {

    const {user} = useContext(AuthContext)

    const contas = [
        { id: '1', nome: 'Nubank', saldo: 2500 },
        { id: '2', nome: 'Carteira', saldo: 150 },
    ];

    const transacoes = [
        { id: '1', nome: 'Pix recebido', valor: 200 },
        { id: '2', nome: 'Mercado', valor: -75.9 },
        { id: '3', nome: 'Transporte', valor: -20 },
    ];

    const [nome, setNome] = useState('Carregando...');
    const [saldoTotal, setSaldoTotal] = useState(0);    

    useEffect(() => {
        
        async function getDados() {
            const userSnap = await getDoc(doc(db, "users", user.uid));
            if(userSnap){
                setNome(userSnap.data()?.nome)
            }
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


                    <View style={{ marginTop: 20}}>
                        <Text style={styles.ContainerTitle}>Últimas transações</Text>

                        {transacoes.map((item) => (
                            <View key={item.id} style={styles.Item}>
                            <Text style={{fontSize: 20}}>{item.nome}</Text>
                            <Text style={{fontSize: 20, color: item.valor < 0 ? 'red' : 'green' }}>
                                R$ {item.valor.toFixed(2)}
                            </Text>
                            </View>
                        ))}

                        <TouchableOpacity>
                            <Text style={{ color: '#00695C', marginTop: 8 }}>Ver todas</Text>
                        </TouchableOpacity>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    },

    Item:{
        
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2
    }
})