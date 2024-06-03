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
import CircularProgress,{ ProgressRef } from 'react-native-circular-progress-indicator';
import { useRef } from 'react';
import ReadyButton from '../components/questionScreen/ReadyButton';


const QuestionScreen = () => {
  const progressRef = useRef<ProgressRef>(null);

  const handleAnswerPress = () => {
    progressRef.current!.pause();
  }

  const handleReadyPress = () => {
    Alert.alert("Ready");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>0/7</Text>
      <View style={styles.progressContainer}>
        <CircularProgress
          ref={progressRef}
          value={0}
          radius={30}
          maxValue={10}
          initialValue={10}
          progressValueColor={'#003C43'}
          activeStrokeWidth={8}
          inActiveStrokeWidth={8}
          duration={10000}
          strokeColorConfig={[
            { color: 'red', value: 0 },
            { color: 'orange', value: 3 },
            { color: '#003C43', value: 3.5 },
            { color: '#003C43', value: 10 },
          ]}
          onAnimationComplete={() => alert('time out')}
        />
      </View>
      <QuestionComponent question='Wie ist die Ffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffffffffrage?'/>
      <View style={styles.answers}>
        <AnswerButton answer='Antwort' onPress={handleAnswerPress}/>
        <AnswerButton answer='Antwort' onPress={handleAnswerPress}/>
        <AnswerButton answer='Antwort' onPress={handleAnswerPress}/>
        <AnswerButton answer='Antwort' onPress={handleAnswerPress}/>
      </View>
      <View style={styles.readyButton}>
        <ReadyButton onPress={handleReadyPress}/>
      </View>
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
  },
  progressContainer: {
    marginBottom: -25,
    marginTop: 40,
    zIndex: 2,
  },
  answers: {
    width: "100%",
    flex: 0.2,
    alignItems: "center",
  },
  readyButton: {
  }
});

export default QuestionScreen;
