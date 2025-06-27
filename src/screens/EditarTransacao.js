import React, { useContext, useEffect, useState } from "react";
import {SafeAreaView, ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from "@react-navigation/native";
import { doc, getDoc, getDocs, query, where, collection, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConnection';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../components/Button';
import { AuthContext } from "../contexts/auth";

export default function EditarTransacao({navigation}){

    const {user} = useContext(AuthContext);
    const { id } = useRoute().params;

    const [nome, setNome] = useState('Carregando...')
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState('')
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState(new Date().toLocaleDateString());

    
    const [contas, setContas] = useState([]);
    const [cartoes, setCartoes] = useState([]);
    const [origem, setOrigem] = useState("Nenhuma");

    const [show, setShow] = useState(false);

    const [errors, setErrors] = useState({})

    useEffect(() => {
        

        async function getTranscao() {
            try {
                const transacaoSnap = await getDoc(doc(db, "transacoes", id));

                if (transacaoSnap) {
                    const data = transacaoSnap.data();
                    setNome(data.nome);
                    setValor(String(data.valor.toFixed(2)))
                    setTipo(data.tipo)
                    const dataConvertida = formatDateString(data.data);
                    setDate(dataConvertida);
                    setData(data.data);
                } else {
                    console.log("Transação não encontrada");
                    
                }

                const contasSnap = await getDocs(query(collection(db, "contas"), where("userUid", "==", user.uid)));
                const cartoesSnap = await getDocs(query(collection(db, "cartoes"), where("userUid", "==", user.uid)));

                const contasLista = contasSnap.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome,
                }));

                const cartoesLista = cartoesSnap.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome,
                }));

                setContas(contasLista);
                setCartoes(cartoesLista);
            } catch (error) {
                console.error("Erro ao carregar transação:", error);
            }
        }

        getTranscao();
    }, []);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
            setData(selectedDate.toLocaleDateString());
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
            await updateDoc(doc(db, "transacoes", id), {
                nome,
                valor: parseFloat(valor),
                data,
                tipo,
                origem
            });
            navigation.goBack();
            console.log("Transação atualizada!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    }

    return(
        <SafeAreaView style={styles.View}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.HeaderContainer}>
                <Text style={styles.Title}>Edite os dados desta transação!</Text>
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

                <Text style={styles.Label}>Tipo:</Text>
                <View style={styles.Tipo}>

                    <TouchableOpacity style={[
                            styles.ButtonTipo,
                            tipo === "Receita" && { backgroundColor: '#FFF'}
                        ]} onPress={() => setTipo("Receita")}>

                        <Text style={[
                            styles.ButtonTipoText,
                            tipo === "Receita" &&{ color: '#00695C'}
                        ]}>Receita</Text>

                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[
                            styles.ButtonTipo,
                            tipo === "Despesa" && { backgroundColor: '#FFF'}
                        ]} onPress={() => setTipo("Despesa")}>

                        <Text style={[
                            styles.ButtonTipoText,
                            tipo === "Despesa" &&{ color: '#00695C'}
                        ]}>Despesa</Text>

                    </TouchableOpacity>
                </View>

                <Text style={styles.Label}>Origem:</Text>
                <View style={styles.Picker}>
                    <Picker                        
                        selectedValue={origem}
                        onValueChange={(itemValue) => setOrigem(itemValue)}
                    >
                        <Picker.Item style={styles.PickerItem} label="Nenhuma" value="Nenhuma"/>
                        <Picker.Item label="Contas" value="" enabled={false} />
                        {contas.map((conta) => (
                            <Picker.Item
                            style={styles.PickerItem}
                            key={`conta-${conta.id}`}
                            label={conta.nome}
                            value={conta.nome}
                            />
                        ))}
                        <Picker.Item 
                            
                            label="Cartões" 
                            value="" 
                            enabled={false} />
                        {cartoes.map((cartao) => (
                            <Picker.Item
                            style={styles.PickerItem}
                            key={`cartao-${cartao.id}`}
                            label={cartao.nome}
                            value={cartao.nome}
                            />
                        ))}
                    </Picker>
                </View> 

                <Text style={styles.Label}>Data:</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.TextInputContainer}>
                        <Text style={styles.TextInput}>{data}</Text>

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
                    
                <Button text="Salvar" onPress={salvarAlteracoes}/>

            </View> 

            </ScrollView>
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
    },

    Tipo:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    ButtonTipo:{
        width: '47%',
        backgroundColor: '#00695C',
        borderColor: '#00695C',
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        marginTop: 3
    },

    ButtonTipoText:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF'
    },

    Picker:{
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        fontSize: 23,
        color: '#212121',
    },

    PickerItem:{
        color: '#212121',
        fontSize: 25
    }


})