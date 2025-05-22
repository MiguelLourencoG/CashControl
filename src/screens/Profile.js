import React, {useContext} from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native"

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
            <TouchableOpacity style={styles.LogoutButton}>
                <Text style={styles.ButtonText} onPress={handleLogout}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    View:{
        flex: 1,
        padding: 12
    },

    Title:{
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold'
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