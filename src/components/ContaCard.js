import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContaCard({ nome, saldo }) {
  return (
    <View style={styles.Card}>
      <Text style={styles.Name}>{nome}</Text>
      <Text style={styles.Saldo}>R$ {saldo}</Text>
    </View>
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
  Name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  Saldo: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
