import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import { Link, router } from 'expo-router';

import { midnightTeal } from '../constants/Colors';

import Logo from '../assets/svgs/Quiz-App-Logo.svg';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';



const MainMenu = () => {

  return (
    <View style={styles.background}>
      <Text>Test</Text>
      <Link href="/play/playScreen">Hier Klicken</Link>
      <TouchableOpacity
        onPress={() => router.push("/play/playScreen")}
        style={styles.container}
      >
        <Logo width={100} height={100} />
      </TouchableOpacity>
    </View>
  );
}

export default function homeScreen() {
  return (
    <View>
      <MainMenu></MainMenu>
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: midnightTeal,
    padding: 20,
    borderRadius: 10,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
