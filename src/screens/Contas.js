import React from "react";
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import { Feather } from '@expo/vector-icons';

export default function Contas(){

    const contas = [
        { id: '1', nome: 'Nubank', saldo: 2500 },
        { id: '2', nome: 'Carteira', saldo: 150 },
    ];

    return(
        <SafeAreaView style={styles.View}>

            <View style={styles.TitleContainer}>
                <Text style={styles.Text}>Visualize todas as suas contas bancárias!</Text>
            </View>

            <View style={styles.Container}>
                
                {contas.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.Item}>
                
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