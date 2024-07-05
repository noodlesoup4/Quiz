import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useLocalSearchParams } from 'expo-router';
import QuestionController from '../controllers/QuestionController';
import QuestionComponent from '../components/questionScreen/QuestionComponent';
import AnswerButton from '../components/questionScreen/AnswerButton';
import ReadyButton from '../components/questionScreen/ReadyButton';
import Question from '../model/Question';

const QuestionScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { selectedCategories } = useLocalSearchParams();
  const [canContinue, setCanContinue] = useState(false);
  const [fontsLoaded] = useFonts({
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  });

  useEffect(() => {
    const fetchQuestions = () => {
      try {
        const categoriesArray = JSON.parse(selectedCategories as string) as string[];
        const questionData: Question[] = QuestionController.getQuestions(categoriesArray, 10);
        setQuestions(questionData);
      } catch (error) {
        console.error('Error fetching questions:', error);
        
      }
    };

    fetchQuestions();
  }, [selectedCategories]);

  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    setCanContinue(true);
    
  };

  const handleReadyPress = () => {
    if (selectedAnswer) {
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCanContinue(false);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      //TODO: statt alert router.push('Evaluation') für Bewertungsscreen ; Brauchen Maybe ein Routercontroller für MVC
      Alert.alert('Quiz beendet', `Ihr Punktestand: ${score}/${questions.length}`);
    }
  }, [currentQuestionIndex, questions.length]);

  if (!fontsLoaded) {
    return <View />;
  }

  if (currentQuestionIndex >= questions.length) {
    //router.push("EvaluationScreen")
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
      <QuestionComponent question={questions[currentQuestionIndex].question} />
      <View style={styles.answers}>
        {questions[currentQuestionIndex].answers.map((answer, index) => {
          const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
          const isSelected = answer === selectedAnswer;
          let buttonStyle = styles.button;

          if (isSelected && isCorrect) {
            buttonStyle = { ...styles.button, ...styles.correctAnswer };
          } else if (isSelected && !isCorrect) {
            buttonStyle = { ...styles.button, ...styles.wrongAnswer };
          }
          else if (!isSelected && isCorrect && selectedAnswer !== null) {
            buttonStyle = { ...styles.button, ...styles.correctAnswer }; // Show correct answer if a wrong answer was selected
          }

          return (
            <AnswerButton
              key={index}
              answer={answer}
              onPress={() => handleAnswerPress(answer)}
              style={buttonStyle}
              disabled = {selectedAnswer !== null} //
            />
          );
        })}
      </View>
      <View style={styles.readyButtonContainer}>
        <ReadyButton onPress={handleReadyPress} style={[styles.readyButton, {opacity: canContinue ? 1: 0.40}]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  answers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },
  button: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  wrongAnswer: {
    backgroundColor: 'red',
  },
  readyButtonContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    width: '100%',
  },
  readyButton: {
    alignItems: 'center',
    padding: 10
  },
});

export default QuestionScreen;
