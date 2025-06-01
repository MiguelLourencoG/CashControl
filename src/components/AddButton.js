import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Button({ onPress}){
    return(
        <SafeAreaView>
            <TouchableOpacity
                style={styles.AddButtom}
                onPress={onPress}
            >
                <Icon name="add" size={70} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AddButtom:{
        width: 90,
        height: 90,
        backgroundColor: '#00695C',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        right: 16,
        elevation: 2
    }
});
  