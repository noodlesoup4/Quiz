import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from 'expo-router';

const EvaluationScreen = () => {
  const params = useLocalSearchParams();

  const score = Array.isArray(params.score) ? parseFloat(params.score[0]) : parseFloat(params.score || '0');
  const total = Array.isArray(params.total) ? parseFloat(params.total[0]) : parseFloat(params.total || '0');
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode || 'unknown';

  let modeText;
  if (mode === 'Normal') {
    modeText = (
      <View style={styles.modeTextContainer}>
        <Text style={[styles.text, styles.h1]}>Du hast</Text>
        <Text style={[styles.text, styles.h1]}>{score} {score === 1 ? 'Frage' : 'Fragen'} von {total} {total === 1 ? 'Frage' : 'Fragen'}</Text>
        <Text style={[styles.text, styles.h1]}>richtig beantwortet.</Text>
      </View>
    );
  } else if (mode === 'Survival') {
    modeText = (
      <View style={styles.modeTextContainer}>
        <Text style={[styles.text, styles.h1]}>Du hast</Text>
        <Text style={[styles.text, styles.h1]}>{score} {score === 1 ? 'Frage' : 'Fragen'} überlebt.</Text>
      </View>
    );
  } else if (mode === 'Custom') {
    modeText = (
      <View style={styles.modeTextContainer}>
        <Text style={[styles.text, styles.h1]}>Du hast</Text>
        <Text style={[styles.text, styles.h1]}>{score} {score === 1 ? 'Frage' : 'Fragen'} von {total} {total === 1 ? 'Frage' : 'Fragen'}</Text>
        <Text style={[styles.text, styles.h1]}>richtig beantwortet.</Text>
      </View>
    );
  } else {
    modeText = (
      <View style={styles.modeTextContainer}>
        <Text style={[styles.text, styles.h1]}>Fehler, es wurde kein spiel erkannt.</Text>
      </View>
    );
  }

  const [fontsLoaded] = useFonts({
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={[styles.text, styles.headerText]}>Ergebnis</Text>
        </View>

        {modeText}

        {/*<TouchableOpacity onPress={() => router.push({
              pathname: 'QuestionScreen',
              params : {selectedCategories : JSON.stringify(selectedCategories),mode, questionCount, timer}
            })}
            style={styles.newGameButton}>
            <Text style={[styles.text, styles.buttonText]}>schneller Neustart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: './CategorySelectionScreen', params: { mode } })} style={styles.newGameButton}>
            <Text style={[styles.text, styles.buttonText]}>Neues Spiel starten</Text>
        </TouchableOpacity>*/}
        <TouchableOpacity onPress={() => router.push("./GamemodeSelectionScreen")} style={styles.newGameButton}>
            <Text style={[styles.text, styles.buttonText]}>Neues Spiel starten</Text>
        </TouchableOpacity>
        
    </SafeAreaView>
  )
}

export default EvaluationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#EFF0F3",
    },
    text: {
        fontFamily: "Lato-Bold",
        color: "#383838",
        textAlign: "center",
        marginVertical: 5,
        zIndex: 1,
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
        zIndex: 1,
    },
    h1: {
        fontSize: 22,
        margin: -15,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        zIndex: 1,
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
    },
    modeTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        //borderWidth: 1,
        //borderColor: 'red',
    },
});