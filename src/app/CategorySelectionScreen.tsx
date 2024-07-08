import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { midnightTeal, paleMist, white } from '../model/Colors';
import { useFonts } from 'expo-font';

const categories = [
  { name: 'Chemie', icon: <FontAwesome5 name="flask" size={24} color="teal" />, testID: 'chemie-button' },
  { name: 'Physik', icon: <FontAwesome name="calculator" size={24} color="teal" />, testID: 'physik-button' },
  { name: 'Politik', icon: <FontAwesome name="university" size={24} color="teal" />, testID: 'politik-button' },
  { name: 'Geschichte', icon: <FontAwesome name="book" size={24} color="teal" />, testID: 'geschichte-button' },
  { name: 'Geographie', icon: <FontAwesome5 name="globe" size={24} color="teal" />, testID: 'geographie-button' },
  { name: 'Natur', icon: <FontAwesome5 name="paw" size={24} color="teal" />, testID: 'natur-button' },
  { name: 'Religion', icon: <FontAwesome6 name="book-bible" size={24} color="teal" />, testID: 'religion-button' },
  { name: 'Zufällig', icon: <FontAwesome name="question" size={24} color="teal" />, testID: 'random-button' },
];

export default function CategorySelectionScreen() {
  const [fontsLoaded] = useFonts({
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  });

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const [randomSelected, setRandomSelected] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  const mode: string = params.mode as string;
  const questionCount: string = params.questionCount as string;
  const timer: string = params.timer as string;
  const isTimerEnabled: string = params.isTimerEnabled as string;

  useEffect(() => {
    //console.log("Mode:", mode);
    //console.log("Question Count:", questionCount);
    //console.log("Timer:", timer);
    //console.log("Is Timer Enabled:", isTimerEnabled);
  }, [mode, questionCount, timer, isTimerEnabled]);

  const handlePress = (index: number) => {
    if (index === 7) {
      if (randomSelected) {
        setRandomSelected(false);
        setSelectedIndexes([]);
        setCanContinue(false);
      } else {
        setRandomSelected(true);
        setSelectedIndexes([index]);
        setCanContinue(true);
      }
    } else {
      if (randomSelected) return;
      const newSelectedIndexes = [...selectedIndexes];
      if (selectedIndexes.includes(index)) {
        const removedIndex = newSelectedIndexes.indexOf(index);
        newSelectedIndexes.splice(removedIndex, 1);
      } else {
        newSelectedIndexes.push(index);
      }
      setSelectedIndexes(newSelectedIndexes);
      setCanContinue(newSelectedIndexes.length > 0);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={[midnightTeal, paleMist]}
      style={styles.container}
      locations={[0.2, 0.2]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Kategorie auswählen</Text>
      </View>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            testID={category.testID}
            style={[
              styles.button,
              selectedIndexes.includes(index) && styles.selectedButton,
              randomSelected && index !== 7 && { opacity: 0.4 },
            ]}
            onPress={() => handlePress(index)}
          >
            {category.icon}
            <Text style={styles.buttonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, { opacity: canContinue ? 1 : 0.4 }]}
        disabled={!canContinue}
        onPress={() => {
          let selectedCategories = selectedIndexes.map(index => categories[index].name.toLowerCase());
          if (randomSelected) {
            selectedCategories = categories
              .filter((_, index) => index !== 7)
              .map(category => category.name.toLowerCase());
          }
          router.push({
            pathname: 'QuestionScreen',
            params: {
              selectedCategories: JSON.stringify(selectedCategories),
              mode: mode,
              questionCount: questionCount,
              timer: timer,
              isTimerEnabled: isTimerEnabled,
            },
          });
          //console.log(typeof isTimerEnabled);
          //console.log(mode, typeof mode);
        }}
      >
        <Text style={styles.continueButtonText}>Weiter</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontFamily: "Lato-Bold"
  },
  headerContainer: {
    position: 'absolute',
    top: '8%',
  },
  grid: {
    top: '5%',
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 100,
  },
  button: {
    width: '40%',
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#77B0AA',
  },
  buttonText: {
    fontFamily: "Lato-Regular",
    fontSize: 18,
    color: 'teal',
    marginTop: 10,
  },
  continueButton: {
    marginTop: 50,
    width: '80%',
    backgroundColor: '#135D66',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
