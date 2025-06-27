import React, {useState, useContext, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Button from "../components/Button";

import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

export default function NovaTransacao({ navigation }) {

    const {user} = useContext(AuthContext);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [errors, setErrors] = useState({})

    const [contas, setContas] = useState([]);
    const [cartoes, setCartoes] = useState([]);
    const [origem, setOrigem] = useState("Nenhuma");

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

    const [nome, setNome] = useState('')
    const [valor, setValor] = useState(null)
    const [data, setData] = useState(date.toLocaleDateString())
    const [tipo, setTipo] = useState("Receita")
    

    useEffect(() => {
        async function carregarDados() {
            try {
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
            } catch (e) {
                console.error("Erro ao carregar contas/cartões:", e);
            }
        }

        carregarDados();
    }, []);

    function validarCampos() {
        let e = {}

        if (!nome) e.nome = "Nome não pode ficar vazio"
        if (!valor) e.valor = "Saldo não pode ficar vazio"
        
        if (valor && valor.includes(',')) e.valor = "Use ponto (.) no lugar da vírgula (,)"
        if (valor && valor.split('.').length > 2) e.valor = "Use apenas um único ponto (.) como separador decimal"

        setErrors(e)
        return Object.keys(e).length === 0;
    
    }

    async function atualizarConta(id, valor) {
        const ref = doc(db, "contas", id);
        const snapshot = await getDoc(ref);
        if (!snapshot.exists()) return;

        const saldoAtual = parseFloat(snapshot.data().saldo || 0);
        const novoSaldo = saldoAtual + valor;

        await updateDoc(ref, { saldo: novoSaldo });
    }

    async function atualizarCartao(id, limite, fatura) {
        const ref = doc(db, "cartoes", id);
        const snapshot = await getDoc(ref);
        if (!snapshot.exists()) return;

        const data = snapshot.data();
        const novoLimite = parseFloat(data.limite || 0) + limite;
        const novaFatura = parseFloat(data.fatura || 0) + fatura;

        await updateDoc(ref, {
            limite: novoLimite,
            fatura: novaFatura
        });
    }


    async function addTransacao() {
    if (!validarCampos()) return;

    try {
        const valorFloat = parseFloat(valor);
        let origemNome = "Nenhuma";

        if (origem !== "Nenhuma") {
            const [tipoOrigem, idOrigem] = origem.split(":");

            if (tipoOrigem === "conta") {
                const conta = contas.find(c => c.id === idOrigem);
                origemNome = conta?.nome || "Desconhecida";

                const ajuste = tipo === "Receita" ? valorFloat : -valorFloat;
                await atualizarConta(idOrigem, ajuste);
            }

            if (tipoOrigem === "cartao") {
                const cartao = cartoes.find(c => c.id === idOrigem);
                origemNome = cartao?.nome || "Desconhecida";

                const limiteAjustado = tipo === "Receita" ? valorFloat : -valorFloat;
                const faturaAjustada = tipo === "Despesa" ? valorFloat : 0;

                await atualizarCartao(idOrigem, limiteAjustado, faturaAjustada);
            }
        }

        await addDoc(collection(db, "transacoes"), {
            nome,
            valor: valorFloat,
            data,
            tipo,
            origem: origemNome,
            userUid: user.uid
        });

        console.log("Transação adicionada!");
        navigation.goBack();
    } catch (e) {
        console.error("Erro ao adicionar transação:", e);
    }
}


    return (
        <SafeAreaView style={styles.View}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} >
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
                    placeholder="ex. 100.00"
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={setValor}
                />

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
                        <Picker.Item 
                            style={styles.PickerItem} 
                            label="Nenhuma" 
                            value="Nenhuma"
                        />
                        <Picker.Item label="Contas" value="" enabled={false} />
                        {contas.map((conta) => (
                        <Picker.Item
                            style={styles.PickerItem}
                            key={`conta-${conta.id}`}
                            label={conta.nome}
                            value={`conta:${conta.id}`}
                        />
                        ))}
                        <Picker.Item label="Cartões" value="" enabled={false} />
                        {cartoes.map((cartao) => (
                        <Picker.Item
                            style={styles.PickerItem}
                            key={`cartao-${cartao.id}`}
                            label={cartao.nome}
                            value={`cartao:${cartao.id}`}
                        />
                        ))}

                    </Picker>
                </View>
                

                <Text style={styles.Label}>Data da transação:</Text>
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

                <Button text="Salvar" onPress={() => addTransacao(nome, valor, data, user.uid)}/>
            </View>
            </ScrollView>
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
        alignItems: 'center',
        padding: 27
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