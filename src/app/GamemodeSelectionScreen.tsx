import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButtonComponent from '../components/Rectangle'
import { router } from 'expo-router'
import { midnightTeal, paleMist, white } from '../model/Colors'


const GamemodeSelectionScreen = () => {
  const custom = 'Custom';
  const normal = 'Normal';
   const survival = 'Survival';
  //When a mode is selected on GamemodeSelectionScreen, 
  //store this information so it can be accessed on QuestionScreen.
  const handleModeSelection = (mode: string) => {
    if(mode === custom) {
      router.push({pathname: 'CustomModeScreen',params: { mode }})
    }
    else{
      router.push({ pathname: './CategorySelectionScreen', params: { mode } });
    }
    
  };
  
  
 
  return (
   <LinearGradient
      colors={[midnightTeal, paleMist]}
      style={styles.container}
      locations={[0.2, 0.2]}
    >
      
      <View style={styles.headerContainer}>
        <Text style ={styles.headerText}>Spielmodus auswählen</Text>
      </View>

    <View>
    <CustomButtonComponent onPress={() => handleModeSelection(normal)}>
      <Text style = {styles.buttonText} >
        Normal
      </Text>
    </CustomButtonComponent>

    <CustomButtonComponent onPress={() => handleModeSelection(survival)}>
      <Text style = {styles.buttonText} >
        Survival
      </Text>
    </CustomButtonComponent>

    <CustomButtonComponent onPress={() => handleModeSelection(custom)}>
      <Text style = {styles.buttonText} >
        Custom
      </Text>
    </CustomButtonComponent>
    
    </View>  

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
  headerContainer: {
    position: 'absolute',
    top: '8%',
  },
  headerText: {
    fontSize: 24,
    color: white,
  },
  buttonText: {
    fontSize: 18,
    color: 'teal',
  },
})