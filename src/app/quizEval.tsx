import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const YourComponent = ({ questions = [] }) => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion: { question: string } = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      router.push({
        pathname: '/quizEval',
        params: {
          score: score.toString(),
          total: questions.length.toString()
        }
      });
    }
  }, [currentQuestionIndex, questions.length, router, score]);

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No questions available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentQuestion.question}</Text>
      {/* Hier können Sie Ihre Fragenlogik hinzufügen */}
    </View>
  );
};

const QuizEval = () => {
  const params = useLocalSearchParams();
  
  const score = Array.isArray(params.score) ? parseFloat(params.score[0]) : parseFloat(params.score || '0');
  const total = Array.isArray(params.total) ? parseFloat(params.total[0]) : parseFloat(params.total || '0');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Evaluation</Text>
      <Text style={styles.text}>Score: {score}</Text>
      <Text style={styles.text}>Total Questions: {total}</Text>
      <Text style={styles.text}>Your performance: {((score / total) * 100).toFixed(2)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default QuizEval;

useEffect(() => {
  if (currentQuestionIndex >= questions.length && questions.length > 0) {
    router.push({
      pathname: './quizEval',
      params: {
        score: score,
        total: questions.length
      }
    });
  }
}, [currentQuestionIndex, questions.length, router, score]);
