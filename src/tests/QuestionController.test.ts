import QuestionController from '../controllers/QuestionController';
import { router } from 'expo-router';
import _ from 'lodash';
import chemistryQuestions from '../model/data/chemistry/chemistry.json';
import geographyQuestions from '../model/data/geography/geography.json';
import historyQuestions from '../model/data/history/history.json';
import natureQuestions from '../model/data/nature/nature.json';
import physicsQuestions from '../model/data/physics/physics.json';
import politicsQuestions from '../model/data/politics/politics.json';
import religionQuestions from '../model/data/religion/religion.json';

jest.mock('lodash', () => ({
  shuffle: jest.fn((arr) => arr),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('QuestionController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('readQuestions', () => {
    test('should read questions from specified categories and shuffle them', () => {
      const categories = ['chemie', 'geographie'];
      const questions = QuestionController['readQuestions'](categories);
      
      expect(questions).toEqual([...chemistryQuestions, ...geographyQuestions]);
      expect(_.shuffle).toHaveBeenCalledWith([...chemistryQuestions, ...geographyQuestions]);
    });

    test('should return an empty array if no categories match', () => {
      const categories = ['nonexistent'];
      const questions = QuestionController['readQuestions'](categories);
      
      expect(questions).toEqual([]);
      expect(_.shuffle).toHaveBeenCalledWith([]);
    });
  });

  describe('getQuestions', () => {
    test('should return a specified amount of questions from the given categories', () => {
      const categories = ['chemie', 'geographie'];
      const amount = 3;
      const questions = QuestionController.getQuestions(categories, amount);
      
      expect(questions.length).toBe(amount);
      expect(questions).toEqual([...chemistryQuestions, ...geographyQuestions].slice(0, amount));
    });

    test('should return all available questions if amount is larger than available questions', () => {
      const categories = ['chemie'];
      const amount = 100;
      const questions = QuestionController.getQuestions(categories, amount);
      
      expect(questions).toEqual(chemistryQuestions);
    });
  });

  describe('endQuiz', () => {
    test('should navigate to EvaluationScreen with correct parameters', () => {
      const score = 10;
      const total = 20;
      const mode = 'Normal';
      
      QuestionController.endQuiz(score, total, mode);
      
      expect(router.push).toHaveBeenCalledWith({
        pathname: 'EvaluationScreen',
        params: { score, total, mode },
      });
    });
  });
});
