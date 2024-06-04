import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface CustomComponentProps {
    question: string;
    style?: any;  // Adding optional style prop
}

const QuestionComponent: React.FC<CustomComponentProps> = ({ question, style }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{question}</Text>
        </View>
    );
};

export default QuestionComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "85%",
        height:"25%",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 50,
        elevation: 5,
        marginBottom: 20,
    },
    text: {
        fontSize: 22,
        margin: 20,
        fontFamily: 'Lato-Bold',
    }
});
