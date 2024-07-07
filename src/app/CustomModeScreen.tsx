import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

const CustomModeScreen: React.FC = () => {
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (questionCount === null || timer === null) {
      Alert.alert("Ungültige Eingabe", "Bitte wählen Sie eine gültige Anzahl der Fragen und eine Timerlänge.");
      return;
    }

    router.push({
      pathname: '/CategorySelectionScreen', 
      params: {
        questionCount: questionCount,
        timer: timer
      }
    });
  };

  const generateOptions = (min: number, max: number, step: number) => {
    const options: { label: string, value: number }[] = [];
    for (let i = min; i <= max; i += step) {
      options.push({ label: i.toString(), value: i });
    }
    return options;
  };

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
        
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={questionCount}
                style={styles.picker}
                onValueChange={(itemValue) => setQuestionCount(itemValue)}
              >
                {generateOptions(10, 50, 1).map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
        </View>

        <View style={styles.divider}></View>
        
        <View style={styles.inputContainer}>
            <Text style={[styles.text, styles.h2]}>Timerlänge</Text>
            <Text style={[styles.text, styles.h3]}>wähle zwischen 10 und 60 Sekunden</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={timer}
                style={styles.picker}
                onValueChange={(itemValue) => setTimer(itemValue)}
              >
                {generateOptions(10, 60, 5).map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
        </View>
        
        <TouchableOpacity style={styles.completedButton} onPress={handleNext}>
            <Text style={[styles.text, styles.buttonText]}>Weiter</Text>
        </TouchableOpacity>
    </View>
  );
};

export default CustomModeScreen;

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
    },
    inputContainer: {
        alignItems: "center",
        width: "100%",
    },
    pickerContainer: {
        width: "80%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 20,
    },
    picker: {
        width: "100%",
        height: "100%",
    },
});
