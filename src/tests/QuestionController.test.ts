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
    test('read questions from specified categories and shuffle them', () => {
      const categories = ['chemie', 'geographie'];
      const questions = QuestionController['readQuestions'](categories);
      
      expect(questions).toEqual([...chemistryQuestions, ...geographyQuestions]);
      expect(_.shuffle).toHaveBeenCalledWith([...chemistryQuestions, ...geographyQuestions]);
    });

    test('return an empty array if no categories match', () => {
      const categories = ['nonexistent'];
      const questions = QuestionController['readQuestions'](categories);
      
      expect(questions).toEqual([]);
      expect(_.shuffle).toHaveBeenCalledWith([]);
    });

    test('handle categories with no questions gracefully', () => {
      const categories = ['chemie', 'emptyCategory'];
      const questions = QuestionController['readQuestions'](categories);
      
      expect(questions).toEqual(chemistryQuestions);
      expect(_.shuffle).toHaveBeenCalledWith(chemistryQuestions);
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

    test('return all available questions if amount is larger than available questions', () => {
      const categories = ['chemie'];
      const amount = 100;
      const questions = QuestionController.getQuestions(categories, amount);
      
      expect(questions).toEqual(chemistryQuestions);
    });

    test('return an empty array if no categories are provided', () => {
      const categories: string[] = [];
      const amount = 10;
      const questions = QuestionController.getQuestions(categories, amount);
      
      expect(questions).toEqual([]);
    });

    test('handle case where amount is zero', () => {
      const categories = ['chemie', 'geographie'];
      const amount = 0;
      const questions = QuestionController.getQuestions(categories, amount);
      
      expect(questions).toEqual([]);
    });

    test('handle case where categories include nonexistent ones', () => {
      const categories = ['chemie', 'nonexistent'];
      const amount = 3;
      const questions = QuestionController.getQuestions(categories, amount);
      
      expect(questions.length).toBe(amount);
      expect(questions).toEqual([...chemistryQuestions].slice(0, amount));
    });
  });

  describe('endQuiz', () => {
    test('navigate to EvaluationScreen with correct parameters', () => {
      const score = 10;
      const total = 20;
      const mode = 'Normal';
      
      QuestionController.endQuiz(score, total, mode);
      
      expect(router.push).toHaveBeenCalledWith({
        pathname: 'EvaluationScreen',
        params: { score, total, mode },
      });
    });

    test('handle edge case where score is negative', () => {
      const score = -5;
      const total = 20;
      const mode = 'Normal';
      
      QuestionController.endQuiz(score, total, mode);
      
      expect(router.push).toHaveBeenCalledWith({
        pathname: 'EvaluationScreen',
        params: { score, total, mode },
      });
    });

    test('handle edge case where total is zero', () => {
      const score = 10;
      const total = 0;
      const mode = 'Normal';
      
      QuestionController.endQuiz(score, total, mode);
      
      expect(router.push).toHaveBeenCalledWith({
        pathname: 'EvaluationScreen',
        params: { score, total, mode },
      });
    });

    test('handle edge case where mode is an invalid string', () => {
      const score = 10;
      const total = 20;
      const mode = 'invalid';
  
      console.error = jest.fn();
  
      QuestionController.endQuiz(score, total, mode);
  
      expect(router.push).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error, no game mode recognized.');
    });
  });
});
