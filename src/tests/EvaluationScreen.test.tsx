import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EvaluationScreen from '../app/EvaluationScreen';
import { router } from 'expo-router';

// Mocking the router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

describe('EvaluationScreen', () => {
  const useLocalSearchParams = require('expo-router').useLocalSearchParams;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('display the correct message for Normal mode with plural questions', () => {
    const params = {
      score: '8',
      total: '10',
      mode: 'Normal'
    };
    useLocalSearchParams.mockReturnValue(params);

    const { getByText } = render(<EvaluationScreen />);

    expect(getByText('Du hast')).toBeTruthy();
    expect(getByText('8 Fragen von 10 Fragen')).toBeTruthy();
    expect(getByText('richtig beantwortet.')).toBeTruthy();
  });

  it('display the correct message for Normal mode with singular question', () => {
    const params = {
      score: '1',
      total: '1',
      mode: 'Normal'
    };
    useLocalSearchParams.mockReturnValue(params);

    const { getByText } = render(<EvaluationScreen />);

    expect(getByText('Du hast')).toBeTruthy();
    expect(getByText('1 Frage von 1 Frage')).toBeTruthy();
    expect(getByText('richtig beantwortet.')).toBeTruthy();
  });

  it('display the correct message for Survival mode', () => {
    const params = {
      score: '5',
      mode: 'Survival'
    };
    useLocalSearchParams.mockReturnValue(params);

    const { getByText } = render(<EvaluationScreen />);

    expect(getByText('Du hast')).toBeTruthy();
    expect(getByText('5 Fragen überlebt.')).toBeTruthy();
  });

  it('display the correct message for Custom mode', () => {
    const params = {
      score: '7',
      total: '10',
      mode: 'Custom'
    };
    useLocalSearchParams.mockReturnValue(params);

    const { getByText } = render(<EvaluationScreen />);

    expect(getByText('Du hast')).toBeTruthy();
    expect(getByText('7 Fragen von 10 Fragen')).toBeTruthy();
    expect(getByText('richtig beantwortet.')).toBeTruthy();
  });

  it('display error message for unknown mode', () => {
    const params = {
      score: '5',
      total: '10',
      mode: 'Unknown'
    };
    useLocalSearchParams.mockReturnValue(params);

    const { getByText } = render(<EvaluationScreen />);

    expect(getByText('Fehler, es wurde kein spiel erkannt.')).toBeTruthy();
  });

  it('navigate to GamemodeSelectionScreen on button press', () => {
    const params = {
      score: '8',
      total: '10',
      mode: 'Normal'
    };
    useLocalSearchParams.mockReturnValue(params);

    const { getByText } = render(<EvaluationScreen />);

    const button = getByText('Neues Spiel starten');
    fireEvent.press(button);

    expect(router.push).toHaveBeenCalledWith('./GamemodeSelectionScreen');
  });
});
