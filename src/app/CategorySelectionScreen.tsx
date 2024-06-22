import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {  white } from '../model/Colors'; // Assuming 'constants/Colors' holds color definitions

const categories = [
  { name: 'Chemie', icon: <FontAwesome5 name="flask" size={24} color="teal" /> },
  { name: 'Physik', icon: <FontAwesome name="calculator" size={24} color="teal" /> },
  { name: 'Musik', icon: <FontAwesome name="music" size={24} color="teal" /> },
  { name: 'Geschichte', icon: <FontAwesome name="book" size={24} color="teal" /> },
  { name: 'Geographie', icon: <FontAwesome5 name="globe" size={24} color="teal" /> },
  { name: 'Tiere', icon: <FontAwesome5 name="paw" size={24} color="teal" /> },
  { name: 'Erotik', icon: <MaterialIcons name="18-up-rating" size={24} color="teal" /> },
  { name: 'Zufällig', icon: <FontAwesome name="question" size={24} color="teal" /> },
];

export default function CategorySelectionScreen() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]); // Array to store selected indices
  const [canContinue, setCanContinue] = useState(false); // State for continue button

  const handlePress = (index: number) => {
    const newSelectedIndexes = [...selectedIndexes];
    if (selectedIndexes.includes(index)) {
      const removedIndex = newSelectedIndexes.indexOf(index);
      newSelectedIndexes.splice(removedIndex, 1);
    } else {
      newSelectedIndexes.push(index);
    }
    setSelectedIndexes(newSelectedIndexes);
    setCanContinue(newSelectedIndexes.length > 0); // Update continue button state
  };

  return (
    <LinearGradient
      colors={['#135D66', '#EFF0F3']}
      style={styles.container}
      locations={[0.2, 0.2]}
    >
      <View>
        <Text style={styles.header}>Kategorie auswählen</Text>
      </View>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedIndexes.includes(index) && styles.selectedButton,
            ]}
            onPress={() => handlePress(index)}
          >
            {category.icon}
            <Text style={styles.buttonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, { opacity: canContinue ? 1 : 0.40 }]}
        disabled={!canContinue} // Disable button if no category selected
        onPress={() => {
          router.push('QuestionScreen');
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
  header: {
    marginTop: -2,
    fontSize: 24,
    color: 'white',
  },
  grid: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 100, // Adjust this value as needed to move the grid lower
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
    fontSize: 18,
    color: 'teal',
    marginTop: 10,
  },
  continueButton: {
    marginTop:50,
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
