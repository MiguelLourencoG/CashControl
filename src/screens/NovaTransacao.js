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

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showDatePicker = () => {
        setShow(true);
    };

        const [nome, setNome] = useState()
        const [valor, setValor] = useState()
        const [data, setData] = useState(date.toLocaleDateString())
        const userUid = user.uid
    
        async function addTransacao() {
    
            console.log(nome)
            console.log(valor)
            console.log(data)
            console.log(userUid)
    
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

                <Text style={styles.Label}>Valor da transação:</Text>
                <TextInput 
                    style={styles.TextInput} 
                    placeholder="ex. -100.00"
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={setValor}
                />

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
    }
})