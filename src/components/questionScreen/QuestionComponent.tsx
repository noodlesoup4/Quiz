import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface CustomComponentProps {
  question: string;
}
const QuestionComponent : React.FC<CustomComponentProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.question}</Text>
    </View>
  )
}

export default QuestionComponent

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      width: "85%",
      flex: 0.28,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: '#000000', // Farbe des Schattens
      shadowOffset: { width: 0, height: 20 }, // Verschiebung des Schattens (x, y)
      shadowOpacity: 0.15, // Deckkraft des Schattens (0-1)
      shadowRadius: 50, // Radius des Schattens
      elevation: 5,
    },
    text: {
      fontSize: 22,
      margin: 20,
    }
})