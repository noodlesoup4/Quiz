import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import { Link, router } from 'expo-router';

import { midnightTeal } from '../constants/Colors';



const MainMenu = () => {

  return (
    <View style={styles.background}>
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
  
 background:{
  flex: 1,
  backgroundColor: midnightTeal
 },
 reactLogo: {
  height: 178,
  width: 290,
  bottom: 0,
  left: 0,
  position: 'absolute',
},
});
