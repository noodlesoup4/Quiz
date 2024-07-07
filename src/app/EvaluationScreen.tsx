import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'

const EvaluationScreen = () => {
    const [fontsLoaded] = useFonts({
        'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
        'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
      });

  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={[styles.text, styles.headerText]}>Ergebnis</Text>
        </View>

        <Text style={[styles.text, styles.h1]}>Du hast</Text>
        <Text style={[styles.text, styles.h1]}>xx Fragen von xx Fragen</Text>
        <Text style={[styles.text, styles.h1]}>richtig beantwortet</Text>

        <View style={styles.divider}></View>

        <TouchableOpacity style={styles.newGameButton}>
            <Text style={[styles.text, styles.buttonText]}>Neues Spiel starten</Text>
        </TouchableOpacity>
    </View>
  )
}

export default EvaluationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#EFF0F3"
    },
    divider:{
        height: 1,
        width: "90%",
        backgroundColor: "lightgrey"
    },
    text: {
        fontFamily: "Lato-Bold",
        color: "#383838"
    },
    header: {
        backgroundColor: "#135D66",
        width: "100%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 28,
        color: "white",
    },
    h1: {
        fontSize: 22,
        margin: -15,
    },
    h2: {
        fontSize: 18,
    },
    h3: {
        fontSize: 14,
        margin: 5,
        fontFamily: "Lato-Regular",
        color: "#949494"
    },
    newGameButton: {
        width: "90%",
        backgroundColor: "#135D66",
        marginVertical: 10,
        padding: 15,
        borderRadius: 20,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 15,
        color: "white",
        fontFamily: 'Lato-Bold',
    },
    textInput: {
        paddingHorizontal: 15,
        borderRadius: 15,
        width: "80%",
        height: 50,
        backgroundColor: "white",
        fontFamily: "Lato-Regular",
        marginVertical: 20,
    },
    inputContainer: {
        alignItems: "center",
        width: "100%",

    }
})