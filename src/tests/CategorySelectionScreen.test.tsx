import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import CategorySelectionScreen from '../app/CategorySelectionScreen';
import { useRouter, useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useLocalSearchParams: jest.fn(() => ({
    mode: 'Custom',
    questionCount: '10',
    timer: '30',
    isTimerEnabled: 'true',
  })),
}));

describe('CategorySelectionScreen', () => {
  let router: any;

  beforeEach(() => {
    router = useRouter();
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByText } = render(<CategorySelectionScreen />);
    expect(getByText('Kategorie auswählen')).toBeTruthy();
    expect(getByText('Weiter')).toBeTruthy();
  });

  it('should enable the continue button when a category is selected', () => {
    const { getByText } = render(<CategorySelectionScreen />);

    const chemieButton = getByText('Chemie');
    
      fireEvent.press(chemieButton);

    const continueButton = getByText('Weiter');
    expect(continueButton.props.style).not.toContainEqual({ opacity: 0.4 });
    expect(continueButton.props.accessibilityState.disabled).toBe(false);
  });

  it('should disable the continue button when no category is selected', () => {
    const { getByText } = render(<CategorySelectionScreen />);

    const continueButton = getByText('Weiter');
    expect(continueButton.props.style).toContainEqual({ opacity: 0.4 });
    expect(continueButton.props.accessibilityState.disabled).toBe(true);
  });

  it('should select and deselect a category', () => {
    const { getByText, getByTestId } = render(<CategorySelectionScreen />);

    const chemieButton = getByText('Chemie');
    
      fireEvent.press(chemieButton);

    const chemieButtonParent = getByTestId('chemie-button');
    expect(chemieButtonParent.props.style).toContainEqual({ backgroundColor: '#77B0AA' });

      fireEvent.press(chemieButton);
    
    expect(chemieButtonParent.props.style).not.toContainEqual({ backgroundColor: '#77B0AA' });
  });

  it('should select random category and disable other categories', () => {
    const { getByText, getByTestId } = render(<CategorySelectionScreen />);

    const randomButton = getByText('Zufällig');
    
      fireEvent.press(randomButton);

    const randomButtonParent = getByTestId('random-button');
    expect(randomButtonParent.props.style).toContainEqual({ backgroundColor: '#77B0AA' });

    const chemieButton = getByText('Chemie');
    
      fireEvent.press(chemieButton);

    expect(chemieButton.props.style).toContainEqual({ opacity: 0.4 });
  });

  it('should navigate to QuestionScreen with selected categories', () => {
    const { getByText } = render(<CategorySelectionScreen />);

    const chemieButton = getByText('Chemie');

    fireEvent.press(chemieButton);

    const continueButton = getByText('Weiter');
    
    fireEvent.press(continueButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: 'QuestionScreen',
      params: {
        selectedCategories: JSON.stringify(['chemie']),
        mode: 'Custom',
        questionCount: '10',
        timer: '30',
        isTimerEnabled: 'true',
      },
    });
  });

  it('should navigate to QuestionScreen with all categories when random is selected', () => {
    const { getByText } = render(<CategorySelectionScreen />);

    const randomButton = getByText('Zufällig');
    
    fireEvent.press(randomButton);

    const continueButton = getByText('Weiter');
    
    fireEvent.press(continueButton);
    

    expect(router.push).toHaveBeenCalledWith({
      pathname: 'QuestionScreen',
      params: {
        selectedCategories: JSON.stringify(['chemie', 'physik', 'politik', 'geschichte', 'geographie', 'natur', 'religion']),
        mode: 'Custom',
        questionCount: '10',
        timer: '30',
        isTimerEnabled: 'true',
      },
    });
  });
});
