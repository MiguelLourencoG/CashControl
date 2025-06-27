import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConnection';

export default function TransacaoCard({ id, nome, valor, data, tipo, origem }) {
    const navigation = useNavigation();

    async function handleDelete(){
        
        try {
            await deleteDoc(doc( db, "transacoes", id))
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <View>
            <TouchableOpacity 
                style={styles.Item} 
                onPress={() => navigation.navigate('EditarTransacao', {id: id})}
            >
                
                <View
                    style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                >
                    <View>
                        <Text 
                            style={styles.Title}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {nome}
                        </Text>
                        <Text
                            style={{fontSize: 17}}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {data}
                        </Text>
                    </View>

                    
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: tipo === 'Receita' ? 'green' : 'red' }}>{tipo}</Text>
                        <Text style={{fontSize: 15}}>{origem}</Text>
                    </View>

                    <View>
                        <Text 
                            style={{fontSize: 17, color: tipo === 'Receita' ? 'green' : 'red' }}
                            numberOfLines={1}
                            ellipsizeMode="tail"                        
                        >
                            R$ {valor.toFixed(2)}
                        </Text>                
                    </View>
                </View>
                
                <TouchableOpacity style={styles.Delete} 
                    onPress={(event) => {
                        event.stopPropagation();
                        handleDelete();
                    }}
                >
                    <Feather name="trash-2" size={30} color="#fff" />
                </TouchableOpacity>
                
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
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

    Title:{
        fontSize: 20,
        
    },

    Delete:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 8
    }

})