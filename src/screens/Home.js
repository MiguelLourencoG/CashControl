import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

import { Feather } from '@expo/vector-icons';
import { AuthContext } from "../contexts/auth";

import { db } from "../firebaseConnection";
import { doc, getDoc, getDocs, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";

import Button from "../components/Button";
import ContaCard from "../components/ContaCard";
import CartaoCard from "../components/CartaoCard";
import AddCard from "../components/AddCard";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {

    const {user} = useContext(AuthContext)
    

    const [contas, setContas] = useState([]);
    const [cartoes, setCartoes] = useState([]);
    const [transacoes, setTransacoes] = useState([]);
    const [pendencias, setPendencias] = useState([]);

    const [nome, setNome] = useState('Carregando...');
    const [saldoTotal, setSaldoTotal] = useState(0);
    const [limiteTotal, setLimiteTotal] = useState(0);
    const [faturaTotal, setFaturaTotal] = useState(0);

    useEffect(() => {
        
        async function getDados() {
            try {
                //Nome
                onSnapshot(doc(db, "users", user.uid), (doc)=>{
                    setNome(doc.data()?.nome)
                })

                //Contas
                const contasRef = collection(db, "contas");
                const contasQuery = query(contasRef, where("userUid", "==", user.uid))
                
                onSnapshot(contasQuery, (querySnapshot) => {
                    const contasData = [];
                    let saldo = 0;

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        contasData.push({ id: doc.id, ...data });
                        saldo += data.saldo;
                    })

                    setContas(contasData);
                    setSaldoTotal(saldo);
                });

                //Cartões
                const cartoesRef = collection(db, "cartoes");
                const cartoesQuery = query(cartoesRef, where("userUid", "==", user.uid))
                
                onSnapshot(cartoesQuery, (querySnapshot) => {
                    const cartoesData = [];
                    let limite = 0;
                    let fatura = 0

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        cartoesData.push({ id: doc.id, ...data });
                        limite += data.limite;
                        fatura += data.fatura;
                    });

                    setCartoes(cartoesData);
                    setLimiteTotal(limite);
                    setFaturaTotal(fatura);
                });

                //Transações
                const transacoesRef = collection(db, "transacoes");
                const transacoesQuery = query(transacoesRef, where("userUid", "==", user.uid))

                onSnapshot(transacoesQuery, (querySnapshot) => {
                    const transacoesData = [];

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        transacoesData.push({ id: doc.id, ...data });
                    });

                    setTransacoes(transacoesData);
                });

                //Pendências
                const pendenciasRef = collection(db, "pendencias");
                const pendenciasQuery = query(pendenciasRef, where("userUid", "==", user.uid))

                onSnapshot(pendenciasQuery, (querySnapshot) => {
                    const pendenciasData = [];

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        pendenciasData.push({ id: doc.id, ...data });
                    });

                    setPendencias(pendenciasData);
                });               
                
            } catch (error) {
                console.log(error)
            }

        }

        getDados();
    }, [])

    return(
        <SafeAreaView style={styles.View}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} >
                
                <View style={styles.HeaderContainer}>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10, 
                    }}>   

                        <Text style={{
                            color: '#FFF',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>
                            Olá {nome}!
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Icon name="person" size={36} color="#FFF"/>
                        </TouchableOpacity>

                    </View>

                    <View style={{flexDirection: 'row', marginVertical: 20}}>

                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Text style={{marginHorizontal: 'auto',
                                fontSize: 15,
                                color: '#CFC',
                                fontWeight: 'bold'
                            }}>
                                Limite atual
                            </Text>

                            <Text style={{marginHorizontal: 'auto',
                                fontSize: 17,
                                color: '#7F7',
                                fontWeight: 'bold'
                            }}>
                                R${limiteTotal.toFixed(2)}
                            </Text>
                        </View>

                        <View style={{flex: 2}}>
                            <Text style={{marginHorizontal: 'auto',
                                fontSize: 20,
                                color: '#FFF',
                                fontWeight: 'bold'
                            }}>
                                Saldo atual
                            </Text>

                            <Text style={{marginHorizontal: 'auto',
                                fontSize: 27,
                                color: '#FFF',
                                fontWeight: 'bold'
                            }}>
                                R${saldoTotal.toFixed(2)}
                            </Text>
                        </View>

                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Text style={{marginHorizontal: 'auto',
                                fontSize: 15,
                                color: '#F99',
                                fontWeight: 'bold'
                            }}>
                                Fatura atual
                            </Text>

                            <Text style={{marginHorizontal: 'auto',
                                fontSize: 17,
                                color: '#F33',
                                fontWeight: 'bold'
                            }}>
                                R${faturaTotal.toFixed(2)}
                            </Text>
                        </View>

                    </View>

                    

                </View>

                <View style={styles.AppContainer}>

                    <View style={{marginBottom: 10}}>

                        <TouchableOpacity style={styles.CardsTitle} onPress={() => navigation.navigate('Contas')}>
                            <Text style={styles.ContainerTitle}>Contas</Text>
                            <Feather name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>

                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={styles.ScrollContent}
                        >
                            {contas.map((conta) => (
                                <ContaCard key={conta.id} id={conta.id} nome={conta.nome} saldo={conta.saldo} />
                            ))}

                            
                            <TouchableOpacity
                                style={styles.AddCard}
                                onPress={() => navigation.navigate('NovaConta')}
                                activeOpacity={0.7}
                                >
                                <Icon name="add" size={40} color="#fff" />
                            </TouchableOpacity>
                                
                                
                        </ScrollView>
                        
                    </View>

                    <View style={{marginBottom: 30}}>

                        <TouchableOpacity style={styles.CardsTitle} onPress={() => navigation.navigate('Cartoes')}>
                            <Text style={styles.ContainerTitle}>Cartões</Text>
                            <Feather name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>

                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={styles.ScrollContent}
                        >
                            {cartoes.map((cartao) => (
                                <CartaoCard key={cartao.id} id={cartao.id} nome={cartao.nome} limite={cartao.limite} fatura={cartao.fatura}/>
                            ))}

                            
                            <TouchableOpacity
                                style={styles.AddCard}
                                onPress={() => navigation.navigate('NovoCartao')}
                                activeOpacity={0.7}
                                >
                                <Icon name="add" size={40} color="#fff" />
                            </TouchableOpacity>
                            

                            
                        </ScrollView>

                    </View>

                    <View style={{marginBottom: 20}}>

                        <TouchableOpacity style={styles.CardsTitle} onPress={() => navigation.navigate('Transacoes')}>
                            <Text style={styles.ContainerTitle}>Últimas transações</Text>
                            <Feather name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                        
                        {transacoes.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={styles.Item}
                                onPress={() => navigation.navigate('EditarTransacao', {id: item.id})}
                            >
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 20,}}>{item.nome}</Text>
                                    <Text>{item.data}</Text>
                                </View>
                    
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 20, color: item.tipo === 'Receita' ? 'green' : 'red' }}>{item.tipo}</Text>
                                    <Text style={{fontSize: 20}}>{item.origem}</Text>
                                </View>

                                <View>
                                    <Text style={{fontSize: 20, color: item.tipo === 'Receita' ? 'green' : 'red' }}>
                                        R$ {item.valor.toFixed(2)}
                                    </Text>                       
                                    
                                </View>
                            </TouchableOpacity>                      
                        ))}

                        <AddCard onPress={() => navigation.navigate('NovaTransacao')}/>

                    </View>

                    <View style={{marginBottom: 20}}>

                        <TouchableOpacity style={styles.CardsTitle} onPress={() => navigation.navigate('Pendencias')}>
                            <Text style={styles.ContainerTitle}>Últimas pendência</Text>
                            <Feather name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                        
                        {pendencias.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={styles.Item}
                                onPress={() => navigation.navigate('EditarPendencia', {id: item.id})}
                            >
                                <View>
                                    <Text style={{fontSize: 20,}}>{item.nome}</Text>
                                    <Text>{item.data}</Text>
                                </View>
                    
                                <View>
                                    <Text style={{fontSize: 20, color: 'red'}}>
                                        R$ {item.valor.toFixed(2)}
                                    </Text>                       
                                    
                                </View>
                            </TouchableOpacity>                      
                        ))}

                        <AddCard onPress={() => navigation.navigate('NovaPendencia')}/>

                    </View>
                    
                </View>

            </ScrollView>           
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    View:{ 
        flex: 1,
        backgroundColor: '#00695C',
        
    },

    HeaderContainer:{
        padding: 20
    },

    Title:{
        marginHorizontal: 'auto',
        marginVertical: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFF'
    },

    Text:{
        marginHorizontal: 'auto',
        fontSize: 30,
        color: '#FFF'
    },
    
    AppContainer:{
        backgroundColor: '#eee',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minHeight: '100%',
        flexGrow: 1
    },

    CardsTitle:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    ScrollContent: {        
        flexDirection: 'row'
    },

    AddCard: {
        backgroundColor: '#00695C',
        width: 150,
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },

    ContainerTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    },

    Item:{
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2
    },
})