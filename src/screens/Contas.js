import React, {useState, useEffect, useContext} from "react";
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import { db } from "../firebaseConnection";
import { doc, getDoc, getDocs, setDoc, collection, query, where } from "firebase/firestore";

import { AuthContext } from "../contexts/auth";
import { Feather } from '@expo/vector-icons';

export default function Contas({navigation}){

    const {user} = useContext(AuthContext)

    const [contas, setContas] = useState([]);

    useEffect(( ) => {
        async function getContas() {
            const contasRef = collection(db, "contas");
            const contasQuery = query(contasRef, where("userUid", "==", user.uid))
            const contasSnap = await getDocs(contasQuery);

            const contasData = [];
            let saldo = 0;

            contasSnap.forEach((doc) => {
                const data = doc.data();
                contasData.push({ id: doc.id, ...data });
            });

            setContas(contasData);
        }
        
        getContas();
    }, [])

    return(
        <SafeAreaView style={styles.View}>

            <View style={styles.TitleContainer}>
                <Text style={styles.Text}>Visualize todas as suas contas bancárias!</Text>
            </View>

            <View style={styles.Container}>
                
                {contas.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.Item} onPress={() => navigation.navigate('EditarConta', {id: item.id})}>
                
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.nome}</Text>

                            <View style={styles.ItemLayout}>
                                <Text style={{ fontSize: 20, color: 'green' }}>
                                    R$ {item.saldo.toFixed(2)}
                                </Text>

                                <TouchableOpacity style={styles.Delete}>
                                    <Feather name="trash-2" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>                        
                        
                        

                    </TouchableOpacity>           
                ))}
                
            </View>

            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    View:{ 
        flex: 1,
        backgroundColor: '#00695C'
    },

    Container:{
        flex: 4,
        justifyContent: 'flex-start',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
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
        elevation: 2,
        borderRadius: 8
    },

    ItemLayout:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4
    },

    Delete: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4444',
        borderRadius: 8,
        padding: 8,
        marginLeft: 12
    },


})