import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Button({text, onPress}){
    return(
        <SafeAreaView>
            <TouchableOpacity style={Styles.Button} onPress={onPress}>
                <Text style={Styles.ButtonText}>{text}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    Button: {
        backgroundColor: '#00695C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    ButtonText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
  