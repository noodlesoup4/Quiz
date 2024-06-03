import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface CustomComponentProps {
    currentQuestion: number;
    totalQuestions: number;
}

const QuestionCounter: React.FC<CustomComponentProps> = ({ currentQuestion, totalQuestions }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{currentQuestion}/{totalQuestions}</Text>
        </View>
    );
};

export default QuestionCounter;

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    text: {
        fontSize: 24,
    }
});
