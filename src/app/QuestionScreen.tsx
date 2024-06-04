import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import QuestionComponent from '../components/questionScreen/QuestionComponent';
import AnswerButton from '../components/questionScreen/AnswerButton';
import ReadyButton from '../components/questionScreen/ReadyButton';
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { useRef } from 'react';
import questions from '../assets/data/questions.json';
import { useFonts } from 'expo-font';

const QuestionScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeUp, setTimeUp] = useState(false);
  const progressRef = useRef<ProgressRef>(null);

  const [fontsLoaded] = useFonts({
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  });

  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    progressRef.current?.pause();
  }

  const highlightCorrectAnswer = () => {
    setTimeUp(true);
    progressRef.current?.pause();
  }

  const handleReadyPress = () => {
    if (timeUp || selectedAnswer) {
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeUp(false);
      progressRef.current?.reAnimate();
    } else {
      Alert.alert('Bitte wählen Sie eine Antwort aus');
    }
  }

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      Alert.alert('Quiz beendet', `Ihr Punktestand: ${score}/${questions.length}`);
    }
  }, [currentQuestionIndex]);

  if (!fontsLoaded) {
    return <View />;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Quiz beendet!</Text>
        <Text style={styles.text}>Dein Punktestand: {score}/{questions.length}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{currentQuestionIndex + 1}/{questions.length}</Text>
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
          onAnimationComplete={() => highlightCorrectAnswer()}
        />
      </View>
      <QuestionComponent question={questions[currentQuestionIndex].question} />
      <View style={styles.answers}>
        {questions[currentQuestionIndex].answers.map((answer, index) => {
          const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
          const isSelected = answer === selectedAnswer;
          let buttonStyle = styles.button;

          if (timeUp && isCorrect) {
            buttonStyle = { ...styles.button, ...styles.correctAnswer };
          } else if (isSelected && !isCorrect) {
            buttonStyle = { ...styles.button, ...styles.wrongAnswer };
          } else if (isSelected && isCorrect) {
            buttonStyle = { ...styles.button, ...styles.correctAnswer };
          }

          return (
            <AnswerButton key={index} answer={answer} onPress={() => handleAnswerPress(answer)} style={buttonStyle} />
          );
        })}
      </View>
      <View style={styles.readyButton}>
        <ReadyButton onPress={handleReadyPress} />
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
    fontSize: 20,
    margin: 20,
  },
  progressContainer: {
    marginBottom: -25,
    marginTop: 40,
    zIndex: 2,
  },
  answers: {
    width: "100%",
    alignItems: "center",
  },
  readyButton: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "white",
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
    paddingVertical: 15, 
    paddingHorizontal: 20,
  },
  correctAnswer: {
    backgroundColor: '#CCE0DE',
    borderColor: "#77B0AA",
    borderWidth: 2,
    paddingVertical: 13,
    paddingHorizontal: 18
  },
  wrongAnswer: {
    backgroundColor: '#F28C8C',
  },
});

export default QuestionScreen;
