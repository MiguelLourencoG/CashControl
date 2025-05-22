import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native"

import { useNavigation, StackActions } from "@react-navigation/native";

import { auth } from "../firebaseConnection";
import { signOut } from "firebase/auth";

import Button from "../components/Button";



export default function Profile({}){
    const navigation = useNavigation();
    async function handleLogout() {
        await signOut(auth)
        navigation.dispatch(StackActions.popTo("Login"))
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