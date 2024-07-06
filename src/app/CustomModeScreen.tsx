import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const CustomModeScreen = () => {
  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={[styles.text, styles.headerText]}>Custom Mode</Text>
        </View>

        <Text style={[styles.text, styles.h1]}>Einstellungen wählen</Text>

        <View style={styles.divider}></View>

        <View style={styles.inputContainer}>
            <Text style={[styles.text, styles.h2]}>Anzahl der Fragen</Text>
            <Text style={[styles.text, styles.h3]}>wähle zwischen 10 und 50 Fragen</Text>
        
        <TextInput style={styles.textInput} placeholder='Anzahl eingeben' placeholderTextColor="lightgrey"></TextInput>
        </View>

        <View style={styles.divider}></View>
        
        <View style={styles.inputContainer}>
            <Text style={[styles.text, styles.h2]}>Timerlänge</Text>
            <Text style={[styles.text, styles.h3]}>wähle zwischen 10 und 60 Sekunden</Text>
            <TextInput style={styles.textInput} placeholder='Timerlänge eingeben' placeholderTextColor="lightgrey"></TextInput>
        </View>
        
        <TouchableOpacity style={styles.completedButton}>
            <Text style={[styles.text, styles.buttonText]}>Weiter</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CustomModeScreen

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
    completedButton: {
        width: "90%",
        backgroundColor: "#135D66",
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
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