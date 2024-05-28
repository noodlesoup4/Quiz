import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { router } from 'expo-router';

import { midnightTeal } from '../constants/Colors';

import Logo from '../assets/svgs/Quiz-App-Logo.svg';

import PlayButton from '../assets/svgs/Quiz-App-Play-Button.svg';



const MainMenu = () => {

  return (
    <View style={styles.background}>
      <Logo style={styles.logoContainer}/>
      <TouchableOpacity
        onPress={() => router.push("./playScreen")}
        style={styles.playContainer}>
        <PlayButton/>
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
  
  background: {
    height: "100%",
    backgroundColor: midnightTeal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: "-10%",
    width: 100,
    height: 100,
    
  },
  playContainer: {
    marginTop: "40%",
    width: 100,
    height: 100,
  },
});
