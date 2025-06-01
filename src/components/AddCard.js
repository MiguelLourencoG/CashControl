import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Button({ onPress}){
    return(
        <SafeAreaView>
            <TouchableOpacity
                style={styles.AddCard}
                onPress={onPress}
            >
                <Icon name="add" size={53} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AddCard:{
        backgroundColor: '#00695C',
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },

});
  