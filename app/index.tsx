import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import { Link, router } from 'expo-router';


const MainMenu = () => {

  return (
    <View style={styles.stepContainer}>
      <Text>Test</Text>
      <Link href="/play/playScreen">Hier Klicken</Link>
      <TouchableOpacity
        onPress={() => router.push("/play/playScreen")}
        style={styles.reactLogo}
      >
        <Text style={styles.reactLogo}>Klicken</Text>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
