import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Alert } from 'react-native';
import QuestionComponent from '../components/questionScreen/QuestionComponent';
import AnswerButton from '../components/questionScreen/AnswerButton';
import { StatusBar } from 'react-native';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


const QuestionScreen = () => {
    const [fontsLoaded] = useFonts({
        'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      });
    const navigation = useNavigation();
  const handlePress = () => {
    
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>0/7</Text>
      <QuestionComponent question='Wie ist die Ffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffffffffrage?'/>
      <AnswerButton answer='Antwort' onPress={handlePress}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF0F3",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  text: {
    color: "blue",r
  }
});

export default QuestionScreen;
