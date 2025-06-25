import React, { useEffect, useState, useContext} from "react";
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import TransacaoCard from '../components/TransacaoCard'
import AddButtom from "../components/AddButton";

import { db } from "../firebaseConnection";
import { doc, getDoc, getDocs, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";

import { AuthContext } from "../contexts/auth";

export default function Transacoes({navigation}){

    const {user} = useContext(AuthContext)
    
    const [transacoes, setTransacoes] = useState([]);

    useEffect(( ) => {
        async function getTransacoes() {
            try {
                const transacoesRef = collection(db, "transacoes");
                const transacoesQuery = query(transacoesRef, where("userUid", "==", user.uid))

                onSnapshot(transacoesQuery, (querySnapshot) => {
                    const transacoesData = [];

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        transacoesData.push({ id: doc.id, ...data });
                    });

                    setTransacoes(transacoesData);
                });
            } catch (error) {
                console.log(error)
            }
        }
        getTransacoes(); 
    }, [])

    return(
        <SafeAreaView style={styles.View}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Text}>Visualize todas as suas transações!</Text>
            </View>

            <View style={styles.Container}>
                
                {transacoes.map((item) => (
                    <TransacaoCard key={item.id} id={item.id} nome={item.nome} valor={item.valor} data={item.data}/>      
                ))}

            </View>

            <AddButtom onPress={() => navigation.navigate('NovaTransacao')}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    View:{ 
        flex: 1,
        backgroundColor: '#00695C',
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
        marginBottom: 20,
        textAlign: 'center'
    },

    Text:{
        fontSize: 30,        
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        margin: 20
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