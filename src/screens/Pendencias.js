import React, { useEffect, useState, useContext} from "react";
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import AddButtom from "../components/AddButton";
import PendenciaCard from '../components/PendenciaCard';

import { db } from "../firebaseConnection";
import { doc, getDoc, getDocs, setDoc, collection, query, where } from "firebase/firestore";

import { AuthContext } from "../contexts/auth";
import { Feather } from '@expo/vector-icons';


export default function Pendencias({navigation}){

    const {user} = useContext(AuthContext)
        
    const [pendencias, setPendenciass] = useState([]);

    //const pendencias = [
    //    { id: '1', nome: 'Mecânico', valor: 200, data: '20/03/2025'},
    //    { id: '2', nome: 'Conta de luz', valor: 300, data: '21/04/2025' },
    //    { id: '3', nome: 'Mensalidade curso', valor: 50, data: '22/05/2025' },
    //];

    useEffect(( ) => {
        async function getPendenciass() {
            const pendenciasRef = collection(db, "pendencias");
            const pendenciasQuery = query(pendenciasRef, where("userUid", "==", user.uid))
            const pendenciasSnap = await getDocs(pendenciasQuery);

            const pendenciasData = [];

            pendenciasSnap.forEach((doc) => {
                const data = doc.data();
                pendenciasData.push({ id: doc.id, ...data });
            });

            setPendenciass(pendenciasData);
        }
        
        getPendenciass();
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
                        id = {item.id}
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