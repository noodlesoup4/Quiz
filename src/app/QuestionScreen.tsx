import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from 'expo-router';
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
  const { selectedCategories, mode } = useLocalSearchParams();
  const [canContinue, setCanContinue] = useState(false);
  const oneMinute = 60;
  const [timer, setTimer] = useState(oneMinute);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [selectedCategories]);

  useEffect(() => {
    if (mode === 'Survival') {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(timerInterval);
            endQuiz();
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [mode]);

  const endQuiz = () => {
    router.push({ pathname: 'EvaluationScreen', params: { score, total: questions.length } });
  };

  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    setCanContinue(true);
  };

  const handleReadyPress = () => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer && mode === 'Normal') {
      if (isCorrect) {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCanContinue(false);
    } else if (selectedAnswer && mode === 'Survival') {
      setTimer(oneMinute);
      if (isCorrect) {
        setScore(score + 1);
      } else {
        endQuiz();
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCanContinue(false);
    }
  };

  useEffect(() => {
    const reachedEndOfQuiz = currentQuestionIndex >= questions.length && questions.length > 0;
    if (reachedEndOfQuiz && mode === 'Normal') {
      endQuiz();
    }
  }, [currentQuestionIndex, questions.length]);

  if (!fontsLoaded || loading) {
    return <View />;
  }

  const hasMoreQuestions = currentQuestionIndex < questions.length;

  return (
    <SafeAreaView style={styles.container}>
      {mode === 'Normal' && hasMoreQuestions && (
        <Text style={styles.text}>{currentQuestionIndex + 1}/{questions.length}</Text>
      )}
      {mode === 'Survival' && hasMoreQuestions && <Text style={styles.timer}>Zeit: {timer}s</Text>}
      {hasMoreQuestions ? (
        <>
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
              } else if (!isSelected && isCorrect && selectedAnswer !== null) {
                buttonStyle = { ...styles.button, ...styles.correctAnswer };
              }

              return (
                <AnswerButton
                  key={index}
                  answer={answer}
                  onPress={() => handleAnswerPress(answer)}
                  style={buttonStyle}
                  disabled={selectedAnswer !== null}
                />
              );
            })}
          </View>
          <View style={styles.readyButtonContainer}>
            <ReadyButton onPress={handleReadyPress} style={[styles.readyButton, { opacity: canContinue ? 1 : 0.40 }]} />
          </View>
        </>
      ) : (
        <Text style={styles.text}>Quiz beendet! Dein Punktestand: {score}/{questions.length}</Text>
      )}
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
  timer: {
    fontSize: 20,
    color: 'red',
    marginBottom: 20,
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
    width: '100%',
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
    padding: 10,
  },
});

export default QuestionScreen;
