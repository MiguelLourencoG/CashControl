import React, {useState, useContext} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "../components/Button";

import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

export default function NovaTransacao({ navigation }) {

    const {user} = useContext(AuthContext);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [errors, setErrors] = useState({})

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showDatePicker = () => {
        setShow(true);
    };

        const [nome, setNome] = useState('')
        const [valor, setValor] = useState(null)
        const [data, setData] = useState(date.toLocaleDateString())
        
    

        function validarCampos() {
            let e = {}

            if (!nome) e.nome = "Nome não pode ficar vazio"
            if (!valor) e.valor = "Saldo não pode ficar vazio"
            
            if (valor && valor.includes(',')) e.valor = "Use ponto (.) no lugar da vírgula (,)"
            if (valor && valor.split('.').length > 2) e.valor = "Use apenas um único ponto (.) como separador decimal"

            setErrors(e)
            return Object.keys(e).length === 0;
        
        }

        async function addTransacao() {
    
            if (!validarCampos()) {
                return;
            }
    
            try {
                const docRef = await addDoc(collection(db, "transacoes"), {
                    nome,
                    valor: parseFloat(valor),
                    data,
                    userUid: user.uid
                });
                console.log("Transação adicionado: ", docRef);
                navigation.goBack();
            } catch (e) {
                console.error("Erro ao adicionar transação: ", e);
            }
        }

    return (
        <SafeAreaView style={styles.View}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Nova transação</Text>
            </View>
            <View style={styles.Container}>
                <Text style={styles.Label}>Nome da transação:</Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="ex. Mercado"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    value={nome}
                    onChangeText={setNome}
                />

                {errors.nome ? <Text style={styles.Erro}>{errors.nome}</Text> : null}

                <Text style={styles.Label}>Valor da transação:</Text>
                <TextInput 
                    style={styles.TextInput} 
                    placeholder="ex. -100.00"
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={setValor}
                />

                {errors.valor ? <Text style={styles.Erro}>{errors.valor}</Text> : null}

                <Text style={styles.Label}>Data da transação:</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.TextInputContainer} >
                    <Text 
                        style={styles.TextInput}
                        value={data}
                        onChangeText={setData}
                    >
                        {date.toLocaleDateString()}
                    </Text>

                    {show && (
                        <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </View>
                </TouchableOpacity>

                <Button text="Salvar" onPress={() => addTransacao(nome, valor, data, user.uid)}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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

    Label:{
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