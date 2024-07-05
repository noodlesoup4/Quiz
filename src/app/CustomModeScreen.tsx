import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const CustomModeScreen = () => {
  return (
    <View>
        <View style={styles.header}>
            <Text style={[styles.text, styles.headerText]}>Custom Mode</Text>
        </View>
        <Text style={[styles.text, styles.h1]}>Einstellungen wählen</Text>
        <View style={styles.divider}></View>
        <Text style={[styles.text, styles.h2]}>Anzahl der Fragen</Text>
        <Text style={[styles.text, styles.h3]}>wähle zwischen 10 und 50 Fragen</Text>
        <TextInput></TextInput>
        <View style={styles.divider}></View>
        <Text style={[styles.text, styles.h2]}>Timerlänge</Text>
        <TextInput></TextInput>
        <TouchableOpacity style={styles.completedButton}>
            <Text style={[styles.text, styles.buttonText]}>Weiter</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CustomModeScreen

const styles = StyleSheet.create({
    divider:{
        height: 1,
        width: "90%",
        backgroundColor: "lightgrey"
    },
    text: {
    },
    header: {
        backgroundColor: "#135D66",
    },
    headerText: {
        fontSize: 36,
    },
    h1: {
        fontSize: 30,
    },
    h2: {
        fontSize: 24,
    },
    h3: {
        fontSize: 16,
    },
    completedButton: {
        backgroundColor: "#135D66",
    },
    buttonText: {

    }
})