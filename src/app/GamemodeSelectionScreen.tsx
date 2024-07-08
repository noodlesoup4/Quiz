import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButtonComponent from '../components/Rectangle'
import { router } from 'expo-router'
import { midnightTeal, paleMist, white } from '../model/Colors'
import { useFonts } from 'expo-font'

const GamemodeSelectionScreen = () => {
  const [fontsLoaded] = useFonts({
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  });

  const custom = 'Custom';
  const normal = 'Normal';
   const survival = 'Survival';

  const handleModeSelection = (mode: string) => {
    if(mode === custom) {
      router.push({pathname: './CustomModeScreen',params: { mode: mode }})
    }
    else{
      router.push({ pathname: './CategorySelectionScreen', params: { mode } });
    }
    
  };
  
  if (!fontsLoaded) {
    return null;
  }
 
  return (
   <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style ={styles.headerText}>Spielmodus</Text>
        <Text style ={styles.headerText}>auswählen</Text>
      </View>

      <View style={styles.content}>
        <CustomButtonComponent style={styles.button} onPress={() => handleModeSelection(normal)}>
          <Text style = {styles.buttonText}>Normal</Text>
        </CustomButtonComponent>

        <CustomButtonComponent style={styles.button} onPress={() => handleModeSelection(survival)}>
          <Text style = {styles.buttonText} >Survival</Text>
        </CustomButtonComponent>

        <CustomButtonComponent style={styles.button} onPress={() => handleModeSelection(custom)}>
          <Text style = {styles.buttonText} >Custom</Text>
        </CustomButtonComponent>
      
      </View>  

    </View>

  )
}

export default GamemodeSelectionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#EFF0F3"
  },
  header: {
    backgroundColor: "#135D66",
    width: "100%",
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 0.8,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: white,
    fontFamily: "Lato-Bold"
  },
  button: {
    width: "80%",
    margin: 30,
  },
  buttonText: {
    fontFamily: "Lato-Bold",
    fontSize: 24,
    color: 'teal',
  },
})