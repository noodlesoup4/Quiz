import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomComponentProps {
    onPress: () => void;
    answer: string;
    style?: any;  // Adding optional style prop
    disabled?: boolean
}

const AnswerButton: React.FC<CustomComponentProps> = ({ answer, onPress, style, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled = {disabled} >
            <Text style={styles.text}>{answer}</Text>
        </TouchableOpacity>
    );
};

export default AnswerButton;

const styles = StyleSheet.create({
    button: {
        bottom: 65,
        width: "80%",
        backgroundColor: "white",
        marginVertical: 10,
        padding: 15,
        borderRadius: 20,
    },
    text: {
        fontSize: 15,
        fontFamily: 'Lato-Bold',
    }
});
