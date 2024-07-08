import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Switch, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';

const CustomModeScreen = () => {
  const [fontsLoaded] = useFonts({
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  });

  const [questionCount, setQuestionCount] = useState<number | null>(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(false);
  const { mode } = useLocalSearchParams();
  const router = useRouter();

  const handleNext = () => {
    if (questionCount === null || (isTimerEnabled && timer === null)) {
      Alert.alert("Ungültige Eingabe", "Bitte wählen Sie eine gültige Anzahl der Fragen und eine Timerlänge.");
      return;
    }

    router.push({
      pathname: '/CategorySelectionScreen',
      params: {
        mode: mode,
        questionCount: questionCount,
        timer: timer,
        isTimerEnabled: isTimerEnabled.toString()
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

  const isButtonDisabled = questionCount === 0 || (isTimerEnabled && timer === null);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.headerText]}>Custom Mode</Text>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={[styles.text, styles.h1]}>Einstellungen wählen</Text>
        <View style={[styles.divider, { marginBottom: 0 }]}></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <Text style={[styles.text, styles.h2]}>Anzahl der Fragen</Text>
            <Text style={[styles.text, styles.h3]}>wähle zwischen 10 und 50 Fragen</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={questionCount}
                style={questionCount === null ? styles.pickerPlaceholder : styles.picker}
                onValueChange={(itemValue) => setQuestionCount(itemValue)}
              >
                <Picker.Item label="Anzahl auswählen" value={null} />
                {generateOptions(10, 50, 5).map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.inputContainer}>
            <Text style={[styles.text, styles.h2]}>Timer</Text>
            <Text style={[styles.text, styles.h3]}>der Timer aktiviert den Survival Modus</Text>
            <Switch
              value={isTimerEnabled}
              onValueChange={(value) => {
                setIsTimerEnabled(value);
                if (!value) {
                  setTimer(null); // Reset timer if switch is turned off
                }
              }}
            />
          </View>

          {isTimerEnabled && (
            <View style={styles.inputContainer}>
              <Text style={[styles.text, styles.h2]}>Timerlänge</Text>
              <Text style={[styles.text, styles.h3]}>wähle zwischen 10 und 60 Sekunden</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={timer}
                  style={timer === null ? styles.pickerPlaceholder : styles.picker}
                  onValueChange={(itemValue) => setTimer(itemValue)}
                >
                  <Picker.Item label="Timerlänge auswählen" value={null} />
                  {generateOptions(10, 60, 5).map((option) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                  ))}
                </Picker>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.completedButton, { opacity: isButtonDisabled ? 0.4 : 1 }]}
          onPress={handleNext}
          disabled={isButtonDisabled}
        >
          <Text style={[styles.text, styles.buttonText]}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EFF0F3"
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  settingsContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  inputSection: {
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  divider: {
    height: 1,
    width: "90%",
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  text: {
    color: "#383838",
    fontFamily: "Lato-Bold",
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
    marginTop: 10,
    marginBottom: 15,
  },
  h2: {
    fontSize: 18,
    marginVertical: 10,
  },
  h3: {
    fontSize: 14,
    margin: 5,
    color: "#949494",
    fontFamily: "Lato-Regular",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  completedButton: {
    width: "80%",
    backgroundColor: "#135D66",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: "10%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
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
    color: "#383838",
  },
  pickerPlaceholder: {
    width: "100%",
    height: "100%",
    color: "#949494",
  },
});

export default CustomModeScreen;
