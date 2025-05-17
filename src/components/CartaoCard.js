// components/CartaoCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartaoCard({ nome, limite }) {
  return (
    <View style={styles.Card}>
      <Text style={styles.Name}>{nome}</Text>
      <Text style={styles.Limit}>R$ {limite}</Text>
    </View>
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
  Name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  Limit: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
