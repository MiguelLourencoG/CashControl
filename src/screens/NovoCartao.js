import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Button from "../components/Button";

export default function NovaConta({ navigation }) {
    return (
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Novo Cartão de Crédito</Text>
            </View>
            <View style={Styles.Container}>
                <Text style={Styles.Text}>Nome do cartão:</Text>
                <TextInput
                    placeholder="Digite o nome do cartão..."
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    style={Styles.TextInput} 
                />

                <Text style={Styles.Text}>Limite do cartão:</Text>
                <TextInput 
                    style={Styles.TextInput} 
                    placeholder="Digite o limite do cartão..."
                    keyboardType="numeric" 
                />

                <Button text="Salvar" onPress={() => navigation.goBack()}/>
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    View:{
        flex: 1,        
        backgroundColor: '#00695C',
        
    },

    TitleContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: 10
    },

    TextInput: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        fontSize: 23,
        color: '#212121',
    }
})