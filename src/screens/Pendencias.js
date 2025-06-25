import React, { useEffect, useState, useContext} from "react";
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import AddButtom from "../components/AddButton";
import PendenciaCard from '../components/PendenciaCard';

import { db } from "../firebaseConnection";
import { doc, getDoc, getDocs, setDoc, collection, query, where, onSnapshot} from "firebase/firestore";

import { AuthContext } from "../contexts/auth";
import { Feather } from '@expo/vector-icons';


export default function Pendencias({navigation}){

    const {user} = useContext(AuthContext)
        
    const [pendencias, setPendencias] = useState([]);


    useEffect(( ) => {
        async function getPendencias() {
            try {
               const pendenciasRef = collection(db, "pendencias");
                const pendenciasQuery = query(pendenciasRef, where("userUid", "==", user.uid))

                onSnapshot(pendenciasQuery, (querySnapshot) => {
                    const pendenciasData = [];

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        pendenciasData.push({ id: doc.id, ...data });
                    });

                    setPendencias(pendenciasData);
                }); 
            } catch (error) {
                console.log(error)
            }
        }
        
        getPendencias();
    }, [])

    return(
        <SafeAreaView style={styles.View}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Text}>Visualize todas as suas pendência!</Text>
            </View>

            <View style={styles.Container}>
                
                {pendencias.map((item) => (

                    <PendenciaCard 
                        key={item.id} 
                        id={item.id}
                        nome={item.nome}
                        valor={item.valor}
                        data={item.data}
                    />
                                         
                ))}                

            </View>

            <AddButtom onPress={() => navigation.navigate('NovaPendencia')}/>

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
    },

    Delete:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 8
    },

    

})