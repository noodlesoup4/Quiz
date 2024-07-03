import QuestionController from './QuestionController';

const categories = ['chemistry', 'geography'];
const amount = 5;
const questions = QuestionController.getQuestions(categories, amount);
console.log(questions[0].correctAnswer);
