import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { oceanTeal } from '@/src/model/Colors';

interface CustomComponentProps {
    onPress: () => void;
    style?: any;  // Adding optional style prop
    
}

const ReadyButton: React.FC<CustomComponentProps> = ({ onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.text}>Weiter</Text>
        </TouchableOpacity>
    );
};

export default ReadyButton;

const styles = StyleSheet.create({
    button: {
        width: "90%",
        backgroundColor: oceanTeal,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    text: {
        fontSize: 15,
        color: "white",
        fontFamily: 'Lato-Bold',
    }
});
