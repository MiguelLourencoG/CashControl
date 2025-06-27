import React, {useContext} from "react";
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from "react-native"

import { useNavigation, StackActions } from "@react-navigation/native";

import Button from "../components/Button";

import { AuthContext } from "../contexts/auth";

export default function Profile({}){

    const {logout} = useContext(AuthContext)

    const navigation = useNavigation();

    async function handleLogout() {
        logout();
    }

    return(
        <SafeAreaView style={styles.View}>
            <Text style={styles.Title}> Perfil </Text>

            <View style={styles.Container}>
                <TouchableOpacity style={styles.LogoutButton}>
                    <Text style={styles.ButtonText} onPress={handleLogout}>Encerrar sessão</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    View:{ 
        flex: 1,
        backgroundColor: '#00695C',
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

    LogoutButton: {
        backgroundColor: '#FFF',
        padding: 12,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    ButtonText: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold',
    },
})