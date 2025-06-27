import React, { useState, useContext} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Button from "../components/Button";

import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

export default function NovoCartao({ navigation }) {

    const {user} = useContext(AuthContext);

    const [nome, setNome] = useState("")
    const [limite, setLimite] = useState(null)
    const [fatura, setFatura] = useState(null)

    const [errors, setErrors] = useState({})

    function validarCampos() {
        let e = {}

        if (!nome) e.nome = "Nome é não pode ficar vazio"
        if (!limite) e.limite = "Limite não pode ficar vazio"
        if (!fatura) e.fatura = "Fatura não pode ficar vazio"
        
        if (limite && limite.includes(',')) e.limite = "Use ponto (.) no lugar da vírgula (,)"
        if (limite && limite.split('.').length > 2) e.limite = "Use apenas um único ponto (.) como separador decimal"

        if (fatura && fatura.includes(',')) e.fatura = "Use ponto (.) no lugar da vírgula (,)"
        if (fatura && fatura.split('.').length > 2) e.fatura = "Use apenas um único ponto (.) como separador decimal"

        setErrors(e)

        return Object.keys(e).length === 0;
       
    }

    async function addCartao() {

        if (!validarCampos()) {
            return;
        }

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
                    placeholder="Ex. Caixa"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    value={nome}
                    onChangeText={setNome}                    
                />

                {errors.nome ? <Text style={Styles.Erro}>{errors.nome}</Text> : null}

                <Text style={Styles.Text}>Limite do cartão:</Text>
                <TextInput 
                    style={Styles.TextInput} 
                    placeholder="Ex. 1500.00"
                    keyboardType="numeric"                    
                    value={limite}
                    onChangeText={setLimite}
                />

                {errors.limite ? <Text style={Styles.Erro}>{errors.limite}</Text> : null}

                <Text style={Styles.Text}>Fatura atual do cartão:</Text>
                <TextInput 
                    style={Styles.TextInput} 
                    placeholder="Ex. 300"
                    keyboardType="numeric"
                    value={fatura}
                    onChangeText={setFatura}
                />

                {errors.fatura ? <Text style={Styles.Erro}>{errors.fatura}</Text> : null}

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
    },

    Erro: {
        color: 'red',
        fontSize: 22,
        marginTop: 4,
        marginLeft: 4,
    }
})