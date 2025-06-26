import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import Button from "../components/Button";

import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

export default function NovaConta({ navigation }) {

    const {user} = useContext(AuthContext);

    const [nome, setNome] = useState('')
    const [saldo, setSaldo] = useState(null)

    const [errors, setErrors] = useState({})
    

    function validarCampos() {
        let e = {}

        if (!nome) e.nome = "Nome não pode ficar vazio"
        if (!saldo) e.saldo = "Saldo não pode ficar vazio"
        
        if (saldo && saldo.includes(',')) e.saldo = "Use ponto (.) no lugar da vírgula (,)"
        if (saldo && saldo.split('.').length > 2) e.saldo = "Saldo inválido: use apenas um ponto (.) como separador decimal"

        setErrors(e)
        return Object.keys(e).length === 0;
       
    }

    async function addConta() {

        if (!validarCampos()) {
            return;
        }

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
                <Text style={Styles.Text}>Nome:</Text>
                <View style={Styles.TextInputContainer}>
                <TextInput 
                    style={Styles.TextInput}
                    placeholder="ex. Conta do Nubank"
                    value={nome}
                    onChangeText={setNome}
                />
                </View>

                {errors.nome ? <Text style={Styles.Erro}>{errors.nome}</Text> : null}

                <Text style={Styles.Text}>Saldo da conta:</Text>
                <TextInput 
                    style={Styles.TextInput} 
                    placeholder="Ex. 200.00"
                    keyboardType="numeric"
                    value={saldo}
                    onChangeText={setSaldo}
                />

                {errors.saldo ? <Text style={Styles.Erro}>{errors.saldo}</Text> : null}

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
    },
    
    Erro: {
        color: 'red',
        fontSize: 22,
        marginTop: 4,
        marginLeft: 4,
    }

})
