import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function ContaCard({ id, nome, saldo }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      style={styles.Card}
      onPress={() => navigation.navigate('EditarConta', {id: id})}
    >
      <Text
        style={styles.Nome}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {nome}
      </Text>

      <Text 
        style={styles.Saldo}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        R$ {saldo.toFixed(2)}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  Saldo: {
    fontSize: 16,
    color: '#373',
    marginTop: 4,
  },
});
