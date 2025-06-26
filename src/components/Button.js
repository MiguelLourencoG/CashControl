import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Button({text, onPress}){
    return(
        <SafeAreaView>
            
            <TouchableOpacity style={styles.Button} onPress={onPress}>
                <Text style={styles.ButtonText}>{text}</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    Button: {
        backgroundColor: '#00695C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    ButtonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
  