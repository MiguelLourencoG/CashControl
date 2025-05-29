// components/CartaoCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function CartaoCard({ nome, limite, fatura }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      style={styles.Card} 
      onPress={() => navigation.navigate('VerCartao')
    }>
    
      <Text
        style={styles.Nome}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {nome}
      </Text>

      <Text 
        style={styles.Limite}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        R$ {limite.toFixed(2)}
      </Text>

      <Text
        style={styles.Fatura}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        R$ {fatura.toFixed(2)}
      </Text>
    
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  Card: {
    backgroundColor: '#fff',
    width: 150,
    height: 100,
    padding: 16,
    marginRight: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    
  },
  Nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  Limite: {
    fontSize: 16,
    color: '#373',
    marginTop: 4,
  },

  Fatura:{
    fontSize: 16,
    color: '#733',
    marginTop: 4,
  }
});
