import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

const loadFonts = () => {
  return Font.loadAsync({
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
  });
};

const CustomModeScreen: React.FC = () => {
  const [questionCount, setQuestionCount] = useState<number | null>(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerCheck, setTimerCheck] = useState<number | null>(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadResources = async () => {
      await loadFonts();
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    };

    loadResources();
  }, []);

  const handleNext = () => {
    if (questionCount === null || (isTimerEnabled && timer === null)) {
      Alert.alert("Ungültige Eingabe", "Bitte wählen Sie eine gültige Anzahl der Fragen und eine Timerlänge.");
      return;
    }

    router.push({
      pathname: '/CategorySelectionScreen',
      params: {
        questionCount: questionCount,
        //timer: timer,
        timerCheck: timerCheck,
        timer: isTimerEnabled ? timer : null,
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

  if (!fontsLoaded) {
    return null; 
  }

  const isButtonDisabled = questionCount === null || (isTimerEnabled && timer === null);

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
            style={questionCount === null ? styles.pickerPlaceholder : styles.picker}
            onValueChange={(itemValue) => setQuestionCount(itemValue)}
          >
            <Picker.Item label="Anzahl auswählen" value={null}/>
            {generateOptions(10, 50, 5).map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value}/>
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.divider}></View>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.text, styles.h2]}>Timer</Text>
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
              <Picker.Item label="Timerlänge auswählen" value={null}/>
              {generateOptions(10, 60, 5).map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value}/>
              ))}
            </Picker>
          </View>
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.completedButton, { opacity: isButtonDisabled ? 0.4 : 1 }]}
        onPress={handleNext}
        disabled={isButtonDisabled}
      >
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
    color: "#383838",
    fontFamily: 'Lato-Regular',
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
    fontFamily: 'Lato-Bold',
  },
  h1: {
    fontSize: 22,
    margin: -15,
    fontFamily: 'Lato-Regular',
  },
  h2: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  h3: {
    fontSize: 14,
    margin: 5,
    color: "#949494",
    fontFamily: 'Lato-Regular',
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
    color: "#383838", // Standardfarbe für reguläre Items
    fontFamily: 'Lato-Regular',
  },
  pickerPlaceholder: {
    width: "100%",
    height: "100%",
    color: "#949494", // Farbe für den Placeholder
    fontFamily: 'Lato-Regular',
  },
});
