import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomModeScreen from '../app/CustomModeScreen';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import '@testing-library/jest-dom';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(() => ({ mode: 'Custom' })),
}));

jest.mock('@react-native-picker/picker', () => ({
  Picker: ({ children, selectedValue, onValueChange }: { children: React.ReactNode, selectedValue: string, onValueChange: (value: string) => void }) => (
    <select value={selectedValue} onChange={(e) => onValueChange(e.target.value.toString())}>
      {children}
    </select>
  ),
  PickerItem: ({ label, value }: { label: string, value: string }) => <option value={value}>{label}</option>,
}));

jest.spyOn(Alert, 'alert');

describe('CustomModeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByText } = render(<CustomModeScreen />);

    expect(getByText('Custom Mode')).toBeTruthy();
    expect(getByText('Einstellungen wählen')).toBeTruthy();
    expect(getByText('Anzahl der Fragen')).toBeTruthy();
    expect(getByText('Timer')).toBeTruthy();
    expect(getByText('Timer aktiviert survival mode!')).toBeTruthy();
    expect(getByText('Weiter')).toBeTruthy();
  });

  it('should enable and disable timer', () => {
    const { getByText, queryByText, getByRole } = render(<CustomModeScreen />);

    const switchElement = getByRole('switch');
    fireEvent.press(switchElement);
    expect(getByText('Timerlänge')).toBeTruthy();
    fireEvent.press(switchElement);
    expect(queryByText('Timerlänge')).toBeNull();
  });

  it('should handle valid next button press with timer disabled', () => {
    const { getByText, getByRole } = render(<CustomModeScreen />);

    const selectElement = getByRole('combobox');
    fireEvent(selectElement, 'change', { target: { value: 20 } });

    const button = getByText('Weiter');
    fireEvent.press(button);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/CategorySelectionScreen',
      params: {
        mode: 'Custom',
        questionCount: 20,
        timer: null,
        isTimerEnabled: 'false',
      },
    });
  });

  it('should handle valid next button press with timer enabled', () => {
    const { getByText, getByRole } = render(<CustomModeScreen />);

    const switchElement = getByRole('switch');
    fireEvent.press(switchElement);

    const questionCountSelect = getByRole('combobox', { name: 'questionCount' });
    fireEvent(questionCountSelect, 'change', { target: { value: 20 } });

    const timerSelect = getByRole('combobox', { name: 'timer' });
    fireEvent.press(timerSelect, { target: { value: 30 } });

    const button = getByText('Weiter');
    fireEvent.press(button);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/CategorySelectionScreen',
      params: {
        mode: 'Custom',
        questionCount: 20,
        timer: 30,
        isTimerEnabled: 'true',
      },
    });
  });

  it('should disable next button if question count is not selected', () => {
    const { getByText } = render(<CustomModeScreen />);

    const button = getByText('Weiter');
    expect(button).toBeDisabled();
  });

  it('should disable next button if timer is enabled but not selected', () => {
    const { getByText, getByRole } = render(<CustomModeScreen />);

    const switchElement = getByRole('switch');
    fireEvent.press(switchElement);

    const button = getByText('Weiter');
    expect(button).toBeDisabled();
  });
});
