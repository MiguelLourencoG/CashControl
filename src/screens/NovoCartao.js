import React, { useState, useContext} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Button from "../components/Button";

import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

export default function NovoCartao({ navigation }) {

    const {user} = useContext(AuthContext);

    const [nome, setNome] = useState()
    const [limite, setLimite] = useState()
    const [fatura, setFatura] = useState()
    const userUid = user.uid

    async function addCartao() {

        console.log(nome)
        console.log(limite)
        console.log(fatura)
        console.log(userUid)

        try {
            const docRef = await addDoc(collection(db, "cartoes"), {
                nome,
                limite: parseFloat(limite),
                fatura: parseFloat(fatura),
                userUid: user.uid
            });
            console.log("Cartão adicionado: ", docRef);
            navigation.goBack();
        } catch (e) {
            console.error("Erro ao adicionar cartão: ", e);
        }
    }

    return (
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Novo Cartão de Crédito</Text>
            </View>
            <View style={Styles.Container}>
                <Text style={Styles.Text}>Nome do cartão:</Text>
                <TextInput
                    style={Styles.TextInput} 
                    placeholder="Digite o nome do cartão..."
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    value={nome}
                    onChangeText={setNome}                    
                />

                <Text style={Styles.Text}>Limite do cartão:</Text>
                <TextInput 
                    style={Styles.TextInput} 
                    placeholder="Digite o limite do cartão..."
                    keyboardType="numeric"                    
                    value={limite}
                    onChangeText={setLimite}
                />

                <Text style={Styles.Text}>Fatura atual do cartão:</Text>
                <TextInput 
                    style={Styles.TextInput} 
                    placeholder="Digite o fatura do cartão..."
                    keyboardType="numeric"
                    value={fatura}
                    onChangeText={setFatura}
                />

                <Button text="Salvar" onPress={() => addCartao(nome, limite, fatura, user.uid)}/>
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