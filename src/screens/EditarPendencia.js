import React, { useEffect, useState } from "react";
import {SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConnection';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../components/Button';

export default function EditarPendencia({navigation}){

    const { id } = useRoute().params;

    const [nome, setNome] = useState('Carregando...')
    const [valor, setValor] = useState(0);
    const [date, setDate] = useState('');

    const [show, setShow] = useState(false);

    const [errors, setErrors] = useState({})

    useEffect(() => {
        

        async function getPendencia() {
            try {
                const pendenciaSnap = await getDoc(doc(db, "pendencias", id));
                
                if (pendenciaSnap) {
                    const data = pendenciaSnap.data();
                    setNome(data.nome);
                    setValor(String(data.valor.toFixed(2)))
                    setDate(data.data)

                    console.log(data.data)
                } else {
                    console.log("Pendência não encontrada");
                }
            } catch (error) {
                console.error("Erro ao carregar pendência:", error);
            }
        }

        getPendencia();
    }, []);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {

            setDate(selectedDate.toLocaleDateString());
        }
    };

    const showDatePicker = () => {
        setShow(true);
    };

    function formatDateString(str) {
        const [dia, mes, ano] = str.split('/');
        return new Date(ano, mes - 1, dia);
    }

    function validarCampos() {
        let e = {}

        if (!nome) e.nome = "Nome não pode ficar vazio"
        if (!valor) e.valor = "Saldo não pode ficar vazio"
        
        if (valor && valor.includes(',')) e.valor = "Use ponto (.) no lugar da vírgula (,)"
        if (valor && valor.split('.').length > 2) e.valor = "Use apenas um único ponto (.) como separador decimal"

        setErrors(e)
        return Object.keys(e).length === 0;
    
    }


    async function salvarAlteracoes() {
        if (!validarCampos()) {
            return;
        }

        try {
            await updateDoc(doc(db, "pendencias", id), {
                nome,
                valor: parseFloat(valor),
                date
            });
            navigation.goBack();
            console.log("Pendência atualizada!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    }


    return(
        <SafeAreaView style={styles.View}>

            <View style={styles.HeaderContainer}>
                <Text style={styles.Title}>Edite os dados desta pendência!</Text>
            </View> 

            <View style={styles.AppContainer}>

                <Text style={styles.Label}>Nome:</Text>
                <View style={styles.TextInputContainer}>
                    <TextInput 
                        style={styles.TextInput}
                        placeholder="ex. Carteira"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                {errors.nome ? <Text style={styles.Erro}>{errors.nome}</Text> : null}

                <Text style={styles.Label}>Valor:</Text>
                <View style={styles.TextInputContainer}>
                    {
                        <Text style={{fontSize: 23}}>R$</Text>
                    }
                    <TextInput 
                        style={styles.TextInput}
                        keyboardType="numeric"
                        placeholder="ex. R$200.50"                        
                        value={valor}
                        onChangeText={setValor}
                    />
                </View>
                
                {errors.valor ? <Text style={styles.Erro}>{errors.valor}</Text> : null}

                <Text style={styles.Label}>Data:</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.TextInputContainer} >
                    <Text style={styles.TextInput}>
                        {date}
                    </Text>

                    {show && (
                        <DateTimePicker
                        value={formatDateString(date)}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </View>
                </TouchableOpacity>
                    
                <Button text="Salvar" onPress={salvarAlteracoes}/>

            </View> 

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    View:{ 
        flex: 1,
        backgroundColor: '#00695C'        
    },
    
    HeaderContainer:{
        padding: 20
    },

    Title:{
        marginHorizontal: 'auto',
        marginVertical: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    },

    AppContainer:{
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minHeight: '100%',
        flexGrow: 1
    },

    Label:{
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: 10
    },

    TextInputContainer: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    TextInput:{
        flex: 1,
        fontSize: 23,
    },

    Erro: {
        color: 'red',
        fontSize: 22,
        marginTop: 4,
        marginLeft: 4,
    }
})