import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ContaCard({ id, nome, valor, data }) {
  return (
    <View>
        <ScrollView>
        <TouchableOpacity style={styles.Item}>
            
            <View>
                <Text style={styles.Title}>{nome}</Text>
                <Text>{data}</Text>
            </View>

            <View>
                <Text style={{fontSize: 20, color: valor < 0 ? 'red' : 'green' }}>
                    R$ {valor.toFixed(2)}
                </Text>                
            </View>
            
            <TouchableOpacity style={styles.Delete}>
                <Feather name="trash-2" size={30} color="#fff" />
            </TouchableOpacity>
            
        </TouchableOpacity>
        </ScrollView>
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
        backgroundColor: '#ff4444',
        borderRadius: 8,
        padding: 8
    }

})