import React from 'react';
import { render } from '@testing-library/react-native';
import { fireEvent, act } from '@testing-library/react-native';
import GamemodeSelectionScreen from '../app/GamemodeSelectionScreen';
import { router } from 'expo-router';
import CustomButtonComponent from '../components/Rectangle';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('../components/Rectangle', () => {
  return ({ onPress, children, style }: { onPress: () => void; children: React.ReactNode; style: React.CSSProperties }) => (
    <button onClick={onPress} style={style}>
      {children}
    </button>
  );
});

describe('GamemodeSelectionScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render correctly', () => {
    const { getByText } = render(<GamemodeSelectionScreen />);

    expect(getByText('Spielmodus')).toBeTruthy();
    expect(getByText('auswählen')).toBeTruthy();
    expect(getByText('Normal')).toBeTruthy();
    expect(getByText('Survival')).toBeTruthy();
    expect(getByText('Custom')).toBeTruthy();
  });

  it('navigate to CategorySelectionScreen with Normal mode', () => {
    const { getByText } = render(<GamemodeSelectionScreen />);

    fireEvent.press(getByText('Normal'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: './CategorySelectionScreen',
      params: { mode: 'Normal' },
    });
  });

  it('navigate to CategorySelectionScreen with Survival mode', () => {
    const { getByText } = render(<GamemodeSelectionScreen />);

    fireEvent.press(getByText('Survival'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: './CategorySelectionScreen',
      params: { mode: 'Survival' },
    });
  });

  it('navigate to CustomModeScreen with Custom mode', () => {
    const { getByText } = render(<GamemodeSelectionScreen />);

    fireEvent.press(getByText('Custom'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: './CustomModeScreen',
      params: { mode: 'Custom' },
    });
  });
});
