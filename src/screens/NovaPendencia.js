import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "../components/Button";

export default function NovaPendencia({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <SafeAreaView style={styles.View}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Nova pendência</Text>
            </View>
            <View style={styles.Container}>
                <Text style={styles.Label}>Nome da pendência:</Text>
                <TextInput
                    placeholder="ex. Conta de luz"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    style={styles.TextInput} 
                />

                <Text style={styles.Label}>Valor a pagar:</Text>
                <TextInput 
                    style={styles.TextInput} 
                    placeholder="ex. 200.00"
                    keyboardType="numeric" 
                />

                <Text style={styles.Label}>Data limite do pagamento:</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.TextInputContainer} >
                    <Text style={styles.TextInput}>
                        {date.toLocaleDateString()}
                    </Text>

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

                <Button text="Salvar" onPress={() => navigation.goBack()}/>
            </View>
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
        alignItems: 'center'
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
    }
})