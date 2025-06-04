import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import Button from "../components/Button";

import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

export default function NovaConta({ navigation }) {

    const {user} = useContext(AuthContext);

    const [nome, setNome] = useState()
    const [saldo, setSaldo] = useState()
    const userUid = user.uid

    async function addConta() {

        console.log(nome)
        console.log(saldo)
        console.log(userUid)

        try {
            const docRef = await addDoc(collection(db, "contas"), {
                nome,
                saldo: parseFloat(saldo),
                userUid: user.uid
            });
            console.log("Conta adicionada: ", docRef);
            navigation.goBack();
        } catch (e) {
            console.error("Erro ao adicionar conta: ", e);
        }
    }

    return (
        <SafeAreaView style={Styles.View}>
            <View style={Styles.TitleContainer}>
                <Text style={Styles.Title}>Nova conta bancária</Text>
            </View>
            <View style={Styles.Container}>
                <Text style={Styles.Text}>Nome da conta:</Text>
                <TextInput
                    style={Styles.TextInput} 
                    placeholder="Digite o nome da conta..."
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    value={nome}
                    onChangeText={setNome}
                    
                />

                <Text style={Styles.Text}>Saldo da conta:</Text>
                <TextInput 
                    style={Styles.TextInput} 
                    placeholder="Digite o saldo da conta..."
                    keyboardType="numeric"
                    value={saldo}
                    onChangeText={setSaldo}
                />

                <Button text="Salvar" onPress={() => addConta(nome, saldo, user.uid)}/>
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
