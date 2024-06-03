import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomComponentProps {
    onPress: () => void;
  }

const ReadyButton: React.FC<CustomComponentProps> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>Weiter</Text>
    </TouchableOpacity>
  )
}

export default ReadyButton

const styles = StyleSheet.create({
    button: {
        width: "80%",
        backgroundColor: "#135D66",
        marginVertical: 10,
        padding: 15,
        borderRadius: 20,
        alignItems: "center"
    },
    text: {
      fontSize: 15,
      color: "white",
    }
})