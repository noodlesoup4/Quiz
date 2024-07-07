import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from 'expo-router';
import QuestionController from '../controllers/QuestionController';
import QuestionComponent from '../components/questionScreen/QuestionComponent';
import AnswerButton from '../components/questionScreen/AnswerButton';
import ReadyButton from '../components/questionScreen/ReadyButton';
import Question from '../model/Question';
import CircularProgress from 'react-native-circular-progress-indicator';


const QuestionScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { selectedCategories, mode, questionCount, timer,timerCheck } = useLocalSearchParams();
  const [canContinue, setCanContinue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progressKey, setProgressKey] = useState(0); //state to manage progress key
  const decrementOneSec = timer ? parseInt(timer[0]) * 1000 : 15000; // Dynamically decreases by one second depending which time has benn selected


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
        let questionData: Question[] = QuestionController.getQuestions(categoriesArray, 15);
        if(mode === 'Custom'){
          const parsedQuestionCount = Array.isArray(questionCount)
              ? parseInt(questionCount[0])
              : parseInt(questionCount as string);
              
            questionData = QuestionController.getQuestions(categoriesArray,parsedQuestionCount);
            
        }
        setQuestions(questionData);
        setLoading(false);
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
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer && mode === 'Normal') {
      if (isCorrect) {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCanContinue(false);
    } else if (selectedAnswer && (mode === 'Survival' || mode === 'Custom')) {
      if (isCorrect) {
        setScore(score + 1);
        setProgressKey(prevKey=>prevKey+1); // Reset progress key to restart CircularProgress
      } else {
        QuestionController.endQuiz(score,questions.length,`${mode}`);
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCanContinue(false);
    }
  };

  useEffect(() => {
    const reachedEndOfQuiz = currentQuestionIndex >= questions.length && questions.length > 0;
    if (reachedEndOfQuiz && (mode === 'Normal' || mode === 'Custom')) {
      QuestionController.endQuiz(score,questions.length,`${mode}`);
    }
  }, [currentQuestionIndex, questions.length]);

  if (!fontsLoaded || loading) {
    return <View />;
  }

  const hasMoreQuestions = currentQuestionIndex < questions.length;


  const parsedTimerCheck = Array.isArray(timerCheck)
              ? parseInt(timerCheck[0])
              : parseInt(timerCheck as string);

  const parsedTimer = Array.isArray(timer)
              ? parseInt(timer[0])
              : parseInt(timer as string);

  const renderTimer = () => {
    const initialValue = mode === 'Custom' && parsedTimerCheck === 1 ? parsedTimer : 15;
    const maxValue = mode === 'Custom' && parsedTimerCheck ? parsedTimer : 15;

 
  return (
    <SafeAreaView style={styles.container}>
      {mode !== 'Survival' && hasMoreQuestions && (
        <Text style={styles.text}>{currentQuestionIndex + 1}/{questions.length}</Text>
      )}
      {(mode === 'Survival' || (mode === 'Custom' && parsedTimerCheck === 1)) && hasMoreQuestions && (
      <View style = {styles.timer}>
        {renderTimer()}
        <CircularProgress 
        key={progressKey} 
        value={0} 
        initialValue={initialValue} 
        maxValue={maxValue} 
        radius={40} 
        progressValueColor='black' 
        duration={decrementOneSec}
        strokeColorConfig={[
          {color: 'green',value: initialValue * 2 / 3}, 
          {color: 'yellowgreen', value: initialValue / 3},
          {color: 'red',value: initialValue / 6}
        ]} 
        onAnimationComplete={()=> QuestionController.endQuiz(score,questions.length,`${mode}`)} 
        />
      </View>
      )}
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
        <View>
        </View>
      )}
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF0F3',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  timer: {
    top: '4%',
    zIndex: 1
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
  },
  correctAnswer: {
    backgroundColor: '#77B0AA',
  },
  wrongAnswer: {
    backgroundColor: '#F28C8C',
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
