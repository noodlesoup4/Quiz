import { StyleSheet, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { midnightTeal } from '../model/Colors';
import Logo from '../assets/svgs/Quiz-App-Logo.svg';
import  PlayButtonComponent  from '../components/PlayButton';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {


  return (
    <SafeAreaView>
      <LinearGradient 
    style={styles.background}
    colors={['#135D66', '#003C43']}>
      <Logo style={styles.logoContainer}/>
     <PlayButtonComponent></PlayButtonComponent>
    </LinearGradient>
    </SafeAreaView>
    
  );
}

export default HomeScreen;

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
  
});
