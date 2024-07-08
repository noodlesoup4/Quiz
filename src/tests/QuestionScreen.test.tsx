import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import QuestionScreen from '../app/QuestionScreen';
import QuestionController from '../controllers/QuestionController';
import { useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
  router: {
    push: jest.fn(),
  },
}));

jest.mock('../controllers/QuestionController');

jest.mock('react-native-circular-progress-indicator', () => {
  return {
    CircularProgress: ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
      setTimeout(onAnimationComplete, 0);
      return null;
    },
  };
});

describe('QuestionScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      selectedCategories: JSON.stringify(['chemie', 'physik']),
      mode: 'Normal',
      questionCount: '10',
      timer: '30',
      isTimerEnabled: 'false',
    });
  });

  it('should render correctly', () => {
    (QuestionController.getQuestions as jest.Mock).mockReturnValue([
      {
        question: 'What is H2O?',
        answers: ['Water', 'Oxygen', 'Hydrogen', 'Carbon Dioxide'],
        correctAnswer: 'Water',
      },
    ]);

    const { getByText } = render(<QuestionScreen />);
    expect(getByText('1/10')).toBeTruthy();
    expect(getByText('What is H2O?')).toBeTruthy();
    expect(getByText('Water')).toBeTruthy();
  });

  it('should handle answer selection', () => {
    (QuestionController.getQuestions as jest.Mock).mockReturnValue([
      {
        question: 'What is H2O?',
        answers: ['Water', 'Oxygen', 'Hydrogen', 'Carbon Dioxide'],
        correctAnswer: 'Water',
      },
    ]);

    const { getByText } = render(<QuestionScreen />);

    const waterButton = getByText('Water');
    act(() => {
      fireEvent.press(waterButton);
    });

    expect(waterButton.props.style).toContainEqual({ backgroundColor: '#77B0AA' });
  });

  it('should handle ready button press', () => {
    (QuestionController.getQuestions as jest.Mock).mockReturnValue([
      {
        question: 'What is H2O?',
        answers: ['Water', 'Oxygen', 'Hydrogen', 'Carbon Dioxide'],
        correctAnswer: 'Water',
      },
    ]);

    const { getByText } = render(<QuestionScreen />);

    const waterButton = getByText('Water');
    act(() => {
      fireEvent.press(waterButton);
    });

    const readyButton = getByText('Ready');
    act(() => {
      fireEvent.press(readyButton);
    });

    expect(QuestionController.endQuiz).toHaveBeenCalledWith(1, 1, 'Normal');
  });

  it('should handle timer completion in survival mode', () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      selectedCategories: JSON.stringify(['chemie', 'physik']),
      mode: 'Survival',
      questionCount: '10',
      timer: '30',
      isTimerEnabled: 'true',
    });

    (QuestionController.getQuestions as jest.Mock).mockReturnValue([
      {
        question: 'What is H2O?',
        answers: ['Water', 'Oxygen', 'Hydrogen', 'Carbon Dioxide'],
        correctAnswer: 'Water',
      },
    ]);

    render(<QuestionScreen />);

    expect(QuestionController.endQuiz).toHaveBeenCalledWith(0, 1, 'Survival');
  });

  it('should show "No more questions available" when questions are completed', () => {
    (QuestionController.getQuestions as jest.Mock).mockReturnValue([
      {
        question: 'What is H2O?',
        answers: ['Water', 'Oxygen', 'Hydrogen', 'Carbon Dioxide'],
        correctAnswer: 'Water',
      },
    ]);

    const { getByText, queryByText } = render(<QuestionScreen />);

    const waterButton = getByText('Water');
    act(() => {
      fireEvent.press(waterButton);
    });

    const readyButton = getByText('Ready');
    act(() => {
      fireEvent.press(readyButton);
    });

    expect(queryByText('What is H2O?')).toBeNull();
    expect(getByText('No more questions available.')).toBeTruthy();
  });
});
