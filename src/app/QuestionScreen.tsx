import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { Alert } from 'react-native';
import QuestionComponent from '../components/questionScreen/QuestionComponent';
import AnswerButton from '../components/questionScreen/AnswerButton';
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
    alignItems: "center",
    height: '100%',
    width: '100%',
  },
  text: {
  },
  progressContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    zIndex: 2,
  },
  answers: {
    position: 'absolute',
    top: '33%',
    width: "100%",
    alignItems: "center",
  },
  readyButton: {
    position: 'absolute',
    bottom: '20%',
    width: '100%',
    alignItems: 'center',
  }
});

export default QuestionScreen;