import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButtonComponent from '../components/Rectangle'
import { router } from 'expo-router'

const GamemodeSelectionScreen = () => {
  
  //When a mode is selected on GamemodeSelectionScreen, 
  //store this information so it can be accessed on QuestionScreen.
  const handleModeSelection = (mode: string) => {
    router.push({ pathname: './CategorySelectionScreen', params: { mode } });
  };
  
  
  return (
   <LinearGradient
      colors={['#135D66', '#EFF0F3']}
      style={styles.container}
      locations={[0.2, 0.2]}
    >
      
      <View>
        <Text style={styles.header}>Spielmodus auswählen</Text>
      </View>
      
    <CustomButtonComponent onPress={() => handleModeSelection('Normal')}>
      <Text style = {styles.buttonText} >
        Normal
      </Text>
    </CustomButtonComponent>

    <CustomButtonComponent onPress={() => handleModeSelection('Survival')}>
      <Text style = {styles.buttonText} >
        Survival
      </Text>
    </CustomButtonComponent>

    <CustomButtonComponent>
      <Text style = {styles.buttonText} >
        Custom
      </Text>
    </CustomButtonComponent>
    


    </LinearGradient>

  )
}

export default GamemodeSelectionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: -120,
    fontSize: 24,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: 'teal',
  },
})