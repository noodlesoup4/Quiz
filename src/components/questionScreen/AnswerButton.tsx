import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ViewStyle } from 'react-native';

interface CustomComponentProps {
    onPress: () => void;
    answer: string;
  }

const AnswerButton: React.FC<CustomComponentProps> = ({answer, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text>{answer}</Text>
    </TouchableOpacity>
  )
}

export default AnswerButton

const styles = StyleSheet.create({
    button: {
        width: "80%",
    },
    text: {

    }
})